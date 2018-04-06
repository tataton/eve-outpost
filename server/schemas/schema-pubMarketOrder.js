const Sequelize = require('sequelize');

const pubMarketOrderSchema = {
    orderID: {
        type: Sequelize.BIGINT,
        primaryKey: true
    },
    regionID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    locationID: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    typeID: {
        type: Sequelize.INTEGER,
        allowNull: false        
    },
    volumeRemain: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    minVolume: {
        type: Sequelize.INTEGER,
        allowNull: false        
    },
    daysRemaining: {
        type: Sequelize.INTEGER,
        allowNull: false          
    }
};

module.exports = pubMarketOrderSchema;