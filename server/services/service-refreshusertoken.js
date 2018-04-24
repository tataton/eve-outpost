const Promise = require('bluebird');
const refresh = require('passport-oauth2-refresh');
const requestNewAccessToken = Promise.promisify(refresh.requestNewAccessToken);

/**
 * Function checks accessToken associated with a Sequelize User instance
 * and accessType, and if it is expired, refreshes it. Then, function 
 * returns a promise, either with a new accessToken (if refreshed)
 * or the old one (if not).
 * 
 * @param {Sequelize.Instance<User>} user for authorization
 * @param {String} accessType
 * @returns {Promise<String>} Valid accessToken (refreshed, or existing)
 */
const refreshUserToken = (user, accessType = 'read', force = false) => {
    const timeToExpiration = Date.parse(user[`${accessType}AccessExpires`]) - Date.now();
    if ((timeToExpiration < 30000) || force) {
        // Less than 10 minutes left, or expired, or forced programmatically.
        return requestNewAccessToken(`oauth2-${accessType}`, 
                    user[`${accessType}RefreshToken`])
                .then(newAccessToken => {
                    user[`${accessType}AccessToken`] = newAccessToken;
                    user[`${accessType}AccessExpires`] = new Date(Date.now() + 1200000);
                    user.save();
                    return Promise.resolve(newAccessToken);
                })
    } else {
        return Promise.resolve(user[`${accessType}AccessToken`]);
    }
}

module.exports = refreshUserToken;