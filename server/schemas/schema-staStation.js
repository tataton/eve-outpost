const Sequelize = require('sequelize');

const staStationSchema = {
    stationID: {
        type: Sequelize.INTEGER,
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
    stationName: {
        type: Sequelize.STRING(100),
        allowNull: false
    }
};

module.exports = staStationSchema;