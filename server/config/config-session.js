const redisStore = require('../modules/module-redisstore');

const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    name: process.env.COOKIE_NAME,
    store: redisStore,
    saveUninitialized: false,
    resave: false,
    cookie: {
        httpOnly: true,
        maxAge: (24 * 60 * 60 * 1000)
    }
};

if (process.env.NODE_ENV == 'production') {
    sessionConfig.proxy = true;
    sessionConfig.cookie.secure = true
} else if (process.env.NODE_ENV == 'development') {
    sessionConfig.proxy = true
}

module.exports = sessionConfig;