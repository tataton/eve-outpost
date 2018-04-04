/**
 * @fileOverview Curries OAuth strategies for both Passport and Refresh.
 * Module exports individual strategies invoked by name.
 * Must be coupled with environmental variables and OAuth
 * provider routes.
 * 
 * @exports authonlyStrategy
 * @exports readStrategy
 * @exports writeStrategy
 */

const access = require('../config/config-access');
const OAuth2Strategy = require('passport-oauth2');
const axios = require('axios');
const AUTH_URL = 'https://login.eveonline.com/oauth/authorize';
const TOKEN_URL = 'https://login.eveonline.com/oauth/token';
const AUTH_VERIFY_URL = 'https://login.eveonline.com/oauth/verify';

const callbackURLString = (accessType) =>
    `${process.env.CALLBACK_PROTOCOL}://${process.env.CALLBACK_FQDN}/auth/${accessType}/callback`;

const User = require('../services/service-database').User;

/**
 * Generates callback function required for OAuth strategy declaractions;
 * accepts accessType string, and then tailors OAuth and database
 * interactions based on that string.
 * @param {string} accessType String representing a unique OAuth strategy.
 * @returns {function} Callback function called by Passport.
 */
const updateAuth = (accessType) => ((accessToken, refreshToken, profile, cb) => {
    axios({
        method: 'get',
        url: AUTH_VERIFY_URL,
        headers: {'Authorization': `Bearer ${accessToken}`},
    })
    .then(response => response.data)
    // EVE Auth server responds to verify query w/ character object.
    .then(character => {
        User
            // First, search User database for characterID.
            .findOne({where: {characterID: character.CharacterID}})
            .then(foundUser => {
                const userProps = { 
                    characterID: character.CharacterID,
                    characterName: character.CharacterName,
                    characterOwnerHash: character.CharacterOwnerHash
                };
                userProps[`${accessType}AccessToken`] = accessToken;
                userProps[`${accessType}RefreshToken`] = refreshToken;
                userProps[`${accessType}AccessExpires`] = character.ExpiresOn;

                if (foundUser) {
                    // Update database user with token info.
                    foundUser.update(userProps, {fields:
                        [`${accessType}AccessToken`,
                            `${accessType}RefreshToken`,
                            `${accessType}AccessExpires`]
                    })
                } else {
                    // Sequelize.Model.findOne resolves promise even if no
                    // result is found; in this case, foundUser = null.
                    // (Promise is rejected only if there is an error
                    // accessing the database.) In this case, create new
                    // user with character object.
                    User.create(userProps)
                }
            });
        character.accessType = accessType;
        // Remove parts of character that we don't need to serialize,
        // to save space in Redis:
        delete character.IntellectualProperty;
        delete character.TokenType;
        delete character.Scopes;
        return cb(null, {character})
        // Currently, we're returning the entire character object to
        // be serialized. This is that we don't have to go back to the
        // database for any of this info. We could, however, return
        // much less (like, say, a unique user.id).
    })
    .catch(err => {return cb(err)});
});

/**
 * Generates an OAuth2Strategy corresponding to an input string. String
 * must match .env environmental variables and API key settings on the
 * CCP ESI OAuth server.
 * @param {string} accessType String representing a unique OAuth strategy.
 * @returns {OAuth2Strategy} Named OAuth2Strategy for consumption by Passport.
 */
const strategy = (accessType) => (new OAuth2Strategy(
    {
        authorizationURL: AUTH_URL,
        tokenURL: TOKEN_URL,
        clientID: process.env[`${accessType.toUpperCase()}_AUTH_CLIENT_ID`],
        clientSecret: process.env[`${accessType.toUpperCase()}_AUTH_CLIENT_SECRET`],
        callbackURL: callbackURLString(accessType),
        scope: access[accessType].authScopes
    },
    updateAuth(accessType)
));

module.exports.authonlyStrategy = strategy('authonly');
module.exports.readStrategy = strategy('read');
module.exports.writeStrategy = strategy('write');