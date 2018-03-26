const Sequelize = require('sequelize');

const mapSolarSystemSchema = {
    solarSystemID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    regionID: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    solarSystemName: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    security: {
        type: Sequelize.INTEGER
    }
};

module.exports = mapSolarSystemSchema;