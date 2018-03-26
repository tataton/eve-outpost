/* Function that checks accessToken associated with a Sequelize User
instance and accessType, and if it is expired, refreshes it. Then, the
function resolves a promise, either with a new accessToken (if refreshed)
or the old one (if not). This function could be called on its
own, in service of an offline, scheduled API call; or it could be called
by the refreshSessionToken service, which then uses the returned token
to update the session info. This method only deals with database info. */

const Promise = require('bluebird');
const requestNewAccessToken = Promise.promisify(require('passport-oauth2-refresh').requestNewAccessToken);

const refreshUserToken = (user, accessType = 'read') => {
    const timeToExpiration = Date.parse(user[`${accessType}AccessExpires`]) - Date.now();
    if (timeToExpiration < 150000) {
        // Less than 2.5 minutes left, or expired.
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