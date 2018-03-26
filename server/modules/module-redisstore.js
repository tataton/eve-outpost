const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const redisClientObject = {};
if (process.env.REDIS_URL) {
    redisClientObject.url = process.env.REDIS_URL
} else {
    redisClientObject.host = process.env.REDIS_HOST;
    redisClientObject.port = process.env.REDIS_PORT;
    if (process.env.REDIS_PASSWORD) {
        redisClientObject.password = process.env.REDIS_PASSWORD
    }
}

const redisClient = redis.createClient(redisClientObject);
const redisStore = new RedisStore({client: redisClient});

module.exports = redisStore;