/* Collection of all HTTP methods. */

const axios = require('axios');
const Promise = require('bluebird');
const refreshUserToken = require('./service-refreshusertoken');
const baseURL = 'https://esi.tech.ccp.is/latest';

/* Instance with simple re-try interceptor for failed un-authed
requests. */
const axiosWithRetry = axios.create({baseURL});
const retryFailedRequest = (error) => {
    if (error.status == 500 && error.config && !error.config.__isRetryRequest) {
        error.config.__isRetryRequest = true;
        return axiosWithRetry(error.config);
    }
    throw error;
};
axiosWithRetry.interceptors.response.use(undefined, retryFailedRequest);

/* All simple authed requests need to delay if they receive an error,
because CCP throttles errors to 100/min, and rejects all requests
beyond that threshhold. Requests in this channel are affected, as a 
result, by errors in other channels; we have to be careful not to
overload error limit. */
const axiosWithDelayedRetry = axios.create({baseURL});
const delayedRetryFailedRequest = (error) => {
    if (error.status <= 503 && error.status >= 400 && error.config && !error.config.__isRetryRequest) {
        error.config.__isRetryRequest = true;
        return Promise.delay(1000 * error.response.headers['x-esi-error-limit-reset'] + 2000)
            .then(() => axiosWithDelayedRetry(error.config));
    }
    throw error;
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
            console.log("Errors remaining: ", error.response.headers['x-esi-error-limit-remain']);
            // Introduce a delay to deal with CCP error
            // throttling.                            
            if (error.response.headers['x-esi-error-limit-remain'] < (3 * Number(process.env.PROMISE_CONCURRENCY))) {
                console.log("Approaching error limit; ", error.response.headers['x-esi-error-limit-remain'], " remaining.");
                return Promise.delay((1000 * error.response.headers['x-esi-error-limit-reset']) + 2000, false);
            } else {
                return false;
            }
        } else if (error.response.status == 503 && error.config && !error.config.__isRetryRequest) {
            console.log("503 retry");
            error.config.__isRetryRequest = true;
            return Promise.delay((1000 * error.response.headers['x-esi-error-limit-reset']) + 2000, axiosCheckMarket(error.config));
        }
        throw error;
    }
);

const http = {

    getAllPublicStructures: () => {
    // Retrieves all structures with public access control lists
    // (ACLs), and returns data as array of structureID numbers.
        return axiosWithRetry({
                url: '/universe/structures/?datasource=tranquility',
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => response.data)
    },

    getAllPrivateStructuresInSystem: (user, systemName, authType = 'read') => {
    // Retrieves an array of structureIDs for structures for which
    // user is on ACL.
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
            }).then(response => response.data.structure)
        })
    },

    getStructureInfo: (user, structureID, authType = 'read') => {
    // Retrieves data on a specific structure (ref by structureID).
    // Parameter 'user' is a Sequelize instance.
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
    }
}

module.exports = http;