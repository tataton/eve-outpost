/* Parses a Heroku Postgres URL string for substrings that contain
connection information required by Sequelize. */

const sqlURLparse = (URLstring) => {
    const parsedArray = URLstring.match(/[A-Za-z0-9.-]+/g);
    const sqlizeObject = {
        database: parsedArray[5],
        username: parsedArray[1],
        password: parsedArray[2],
        host: parsedArray[3],
        port: parseInt(parsedArray[4], 10),
        dialect: parsedArray[0],
        logging: false,
        operatorsAliases: false
    };
    if (process.env.DB_SSL) {
        sqlizeObject.dialectOptions = {ssl: true}
    }
    return sqlizeObject
};

module.exports = sqlURLparse;