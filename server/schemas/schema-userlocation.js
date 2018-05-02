const Sequelize = require('sequelize');

const locationIDType = {
    type: Sequelize.BIGINT,
    allowNull: true
};

const locationNameType = {
    type: Sequelize.STRING,
    allowNull: true
}

const userLocationSchema = {
    characterID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    savedLocationID: locationIDType,
    savedLocationName: locationNameType,
    pastLocationOneID: locationIDType,
    pastLocationOneName: locationNameType,
    pastLocationTwoID: locationIDType,
    pastLocationTwoName: locationNameType,
    pastLocationThreeID: locationIDType,
    pastLocationThreeName: locationNameType
};

module.exports = userLocationSchema;