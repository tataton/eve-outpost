const Sequelize = require('sequelize');

const mapRegionSchema = {
    regionID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    regionName: {
        type: Sequelize.STRING(100)
    }
};

module.exports = mapRegionSchema;