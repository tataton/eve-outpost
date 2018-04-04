const Sequelize = require('sequelize');

const userSchema = {
    characterID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    },
    characterOwnerHash: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    characterName:{
        type: Sequelize.STRING,
        allowNull: false
    },
    readAccessToken: {
        type: Sequelize.STRING
    },
    readAccessExpires: {
        type: Sequelize.DATE,
        validate: {isDate: true}
    },
    readRefreshToken: {
        type: Sequelize.STRING
    },
    writeAccessToken: {
        type: Sequelize.STRING
    },
    writeAccessExpires: {
        type: Sequelize.DATE,
        validate: {isDate: true}
    },
    writeRefreshToken: {
        type: Sequelize.STRING
    }
};

module.exports = userSchema;