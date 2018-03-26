/* Module that configures passport for both read- and
write-access login, and then exports its instance. */

const passport = require('passport');
const refresh = require('passport-oauth2-refresh');
const readStrategy = require('./module-auth-strategies').readStrategy;
const writeStrategy = require('./module-auth-strategies').writeStrategy;

passport.use('oauth2-read', readStrategy);
refresh.use('oauth2-read', readStrategy);
passport.use('oauth2-write', writeStrategy);
refresh.use('oauth2-write', writeStrategy);

passport.serializeUser((user, done) => {
    /* For now, serializing entire user object. In the future,
    could alternately just serialize some user id property. */
    done(null, user);
});

passport.deserializeUser((user, done) => {
    /* If additional details about user account are needed
    attached to the session, can incorporate database call
    here. Currently, EVE SSO server gives us all the info
    we need. */
    return done(null, user);
});

module.exports = passport;