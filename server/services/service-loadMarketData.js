const Promise = require('bluebird');
const http = require('./service-http');
const PubMarketOrder = require('./service-database').PubMarketOrder;
const Region = require('./service-database').Region;

const daysRemaining = (duration, issued) => {
    const daysPassed = parseInt((Date.now() - Date.parse(issued)) / 86400000);
    return (duration - daysPassed);
}

const loadMarketData = () => {
    Region.findAll()
        .mapSeries(region => {
            return http.getPublicMarketOrdersInRegion(region.regionID)
                .then(orderArray => orderArray.map(order => 
                    ({
                        orderID: order['order_id'],
                        regionID: region.regionID,
                        locationID: order['location_id'],
                        typeID: order['type_id'],
                        volumeRemain: order['volume_remain'],
                        price: order.price,
                        minVolume: order['min_volume'],
                        daysRemaining: daysRemaining(order.duration, order.issued)
                    })
                ))
                .then(objectArray => {
                    PubMarketOrder.destroy({where: {regionID: region.regionID}})
                        .then(() => Promise.delay(1000))
                        .then(() => PubMarketOrder.bulkCreate(objectArray))
                })
                .catch(error => {console.log(error)})
        })
};

module.exports = loadMarketData;