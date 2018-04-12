const Promise = require('bluebird');
const { getPublicMarketOrdersInRegion } = require('./service-http');
const { PubMarketOrder, Region } = require('./service-database');

const daysRemaining = (duration, issued) => {
    const daysPassed = parseInt((Date.now() - Date.parse(issued)) / 86400000);
    return (duration - daysPassed);
}

/**
 * Loads public market orders from CCP ESI into the remote database.
 */
const loadMarketData = () => {
    Region.findAll()
        .mapSeries(region => {
            return getPublicMarketOrdersInRegion(region.regionID)
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