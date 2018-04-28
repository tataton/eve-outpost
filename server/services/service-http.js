/* Collection of all HTTP methods. */

const axios = require('axios');
const Promise = require('bluebird');
const refreshUserToken = require('./service-refreshusertoken');
const baseURL = 'https://esi.tech.ccp.is/latest';

class AccessForbiddenError extends Error {
    constructor(...args) {
        super(...args)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AccessForbiddenError)
        }
    }
}

/**
 * Axios instance for un-authed requests. Re-tries failed requests
 * immediately.
 */
const axiosWithRetry = axios.create({baseURL});
const retryFailedRequest = (error) => {
    if (error.status >= 500 && error.config && !error.config.__isRetryRequest) {
        error.config.__isRetryRequest = true;
        return axiosWithRetry(error.config);
    }
    throw error;
};
axiosWithRetry.interceptors.response.use(undefined, retryFailedRequest);

/**
 * Axios instance for authed requests. Authed requests often fail for
 * non-auth, server-related (error status >=500) reasons, but these
 * non-auth failures still count against ESI error limiting (100/min).
 * As a result, re-tries need to be delayed/throttled.
 */
const axiosWithDelayedRetry = axios.create({baseURL});
const delayedRetryFailedRequest = (error) => {
    if (error.response.status == 403) {
        throw new AccessForbiddenError("403 (Forbidden) in axiosWithDelayedRetry.");
    }
    else if (error.config && !error.config.__isRetryRequest) {
        error.config.__isRetryRequest = true;
        if (error.response && error.response.headers['x-esi-error-limit-reset']) {
            return Promise.delay(1000 * error.response.headers['x-esi-error-limit-reset'] + 2000)
                .then(() => axiosWithDelayedRetry(error.config));
        } else {
            return Promise.delay(10000)
                .then(() => axiosWithDelayedRetry(error.config));
        } 
    } else {
        throw new Error(error);
    }

};
axiosWithDelayedRetry.interceptors.response.use(undefined, delayedRetryFailedRequest);

/* Market-exists requests generate errors by CCP's (bad) design. As a
result, these too must be throttled, and they happen often. */
const axiosCheckMarket = axios.create({baseURL});
axiosCheckMarket.interceptors.response.use(
    // If we get a positive (200) response, we don't even need to know
    // what the response is. Just return true.
    () => true,
    // If we get an error, things are more complicated.
    error => {
        if (error.response.status == 403) {
            console.log('Errors remaining: ', error.response.headers['x-esi-error-limit-remain']);
            // Introduce a delay to deal with CCP error
            // throttling.                            
            if (error.response.headers['x-esi-error-limit-remain'] < (3 * Number(process.env.PROMISE_CONCURRENCY))) {
                console.log('Approaching error limit; ', error.response.headers['x-esi-error-limit-remain'], ' remaining.');
                return Promise.delay((1000 * error.response.headers['x-esi-error-limit-reset']) + 2000, false);
            } else {
                return false;
            }
        } else if (error.response.status == 503 && error.config && !error.config.__isRetryRequest) {
            console.log('503 retry');
            error.config.__isRetryRequest = true;
            return Promise.delay((1000 * error.response.headers['x-esi-error-limit-reset']) + 2000, axiosCheckMarket(error.config));
        }
        throw error;
    }
);

/**
 * Retrieves all structures with public access control lists
 * (ACLs).
 * @returns {Promise<Number[]>} Array of structureID numbers.
 */
const getAllPublicStructures = () => {
    return axiosWithRetry({
            url: '/universe/structures/?datasource=tranquility',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.data)
};

/**
 * Retrieves array of structureIDs in which name contains systemName
 * and for which user is on ACL.
 * 
 * @param {Sequelize.Instance<User>} user Sequelize instance reference to character.
 * @param {String} systemName String to search structure names.
 * @param {String} authType Character's authorization type.
 * @returns {Promise<Number[]>} Array of structureIDs containing search string in their structureName.
 */
const getAllStructuresInSystem = (user, systemName, authType = 'read') => {
    return refreshUserToken(user, authType)
    // Make sure user (Sequelize ref) accessToken is updated,
    .then(accessToken => {
        // and use it to get data on the current structureID.
        return axiosWithDelayedRetry({
            url: `/characters/${user.characterID}/search/?categories=structure&datasource=tranquility&language=en-us&search=${systemName}`,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json'
            }
        })
        .then(response => response.data.structure)
    })
};

/**
 * Retrieves data from ESI on a specific structure (referenced by
 * structureID).
 * 
 * @param {Sequelize.Instance<User>} user Sequelize instance reference to character.
 * @param {Number} structureID for one structure
 * @param {String} authType Character's authorization type.
 * @returns {Promise<Object>} Properties of requested structure.
 */
const getStructureInfo = (user, structureID, authType = 'read') => {
    return refreshUserToken(user, authType)
    // Make sure user (Sequelize ref) accessToken is updated,
    .then(accessToken => {
        // and use it to get data on the current structureID.
        return Promise.all([
            axiosWithDelayedRetry({
                url: `/universe/structures/${structureID}/?datasource=tranquility`,
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept': 'application/json'
                }
            })
            .then(response => response.data),
            axiosCheckMarket({
                url: `/markets/structures/${structureID}/?datasource=tranquility`,
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept': 'application/json'
                }
            })
        ])
        .then(([{solar_system_id, name, type_id}, hasMarket]) => {
            // Returns object containing DB structure format.
            return Promise.resolve({ 
                structureID,
                solarSystemID: solar_system_id,
                structureName: name,
                typeID: type_id,
                hasMarket
            })
        })
    })
};

/**
 * Retrieves data from ESI on a specific structure (referenced by
 * structureID). Does not include market info.
 * 
 * @param {Sequelize.Instance<User>} user Sequelize instance reference to character.
 * @param {Number} structureID for one structure
 * @param {String} authType Character's authorization type.
 * @returns {Promise<Object>} Properties of requested structure.
 */
const getStructureInfoWithoutMarket = (user, structureID, authType = 'read') => {
    // Retrieves data on a specific structure (ref by structureID).
    // Parameter 'user' is a Sequelize instance.
        return refreshUserToken(user, authType)
        // Make sure user (Sequelize ref) accessToken is updated,
        .then(accessToken => {
            // and use it to get data on the current structureID.
            return axiosWithDelayedRetry({
                url: `/universe/structures/${structureID}/?datasource=tranquility`,
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept': 'application/json'
                }
            })
            .then(response => response.data)
            .then(({solar_system_id, name, type_id}) => {
                // Returns object containing DB structure format.
                return Promise.resolve({ 
                    structureID,
                    solarSystemID: solar_system_id,
                    structureName: name,
                    typeID: type_id
                })
            })
        })
};

/**
 * Retrieves all public market orders in a region.
 * 
 * @param {Number} regionID
 * @returns {Promise<Object[]>} Array of order objects.
 */
const getPublicMarketOrdersInRegion = (regionID) => {
    return axiosWithRetry({
        url: `/markets/${regionID}/orders/?datasource=tranquility&order_type=sell`,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        const pages = response.headers['x-pages'];
        if (pages > 1) {
            return Promise.reduce(
                Array.from(new Array(Number(pages)), (x,i) => i + 1),
                (combinedArray, current) => {
                    return axiosWithRetry({
                        url: `/markets/${regionID}/orders/?datasource=tranquility&order_type=sell&page=${current}`,
                        headers: {
                            'Accept': 'application/json'
                        }
                    })
                    .then(pageResponse => pageResponse.data)
                    .then(resultArray => [...combinedArray, ...resultArray])
                }, []
            )
        } else {
            return response.data
        }
    })
    .catch(err => {console.log(err)})
};

module.exports = {
    getAllPublicStructures,
    getAllStructuresInSystem,
    getStructureInfo,
    getStructureInfoWithoutMarket,
    getPublicMarketOrdersInRegion
}