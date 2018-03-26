const Sequelize = require('sequelize');

const publicStructureSchema = {
    structureID: {
        type: Sequelize.BIGINT,
        primaryKey: true
    },
    solarSystemID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    regionID: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    structureName: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    typeID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    hasMarket: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    }
};

module.exports = publicStructureSchema;