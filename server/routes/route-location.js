const express = require('express');
const router = express.Router();
const Promise = require('bluebird');
const { UserLocation } = require('../services/service-database');

const getLocationObject = characterID => 
    UserLocation.findOne({where: {characterID}}).get({plain: true});

router.post('/setlocation', (req, res) => {
    if (req.isAuthenticated()) {
        const characterID = req.user.character.characterID;
        UserLocation.findOne({where: {characterID}})
            .then(locationRecord => {
                if (!locationRecord.savedLocationID) {
                    return locationRecord.update({
                        savedLocationID: req.body.location.id,
                        savedLocationName: req.body.location.name
                    })
                } else if (locationRecord.savedLocationID != req.body.location.id) {
                    const pastLocationArray = [
                        {id: locationRecord.savedLocationID, name: locationRecord.savedLocationName},
                        {id: locationRecord.pastLocationOneID, name: locationRecord.pastLocationOneName},
                        {id: locationRecord.pastLocationTwoID, name: locationRecord.pastLocationTwoName},
                        {id: locationRecord.pastLocationThreeID, name: locationRecord.pastLocationThreeName}
                    ].filter(location => (location.id != req.body.location.id));
                    return locationRecord.update({
                        savedLocationID: req.body.location.id,
                        savedLocationName: req.body.location.name,
                        pastLocationOneID: pastLocationArray[0].id,
                        pastLocationOneName: pastLocationArray[0].name,
                        pastLocationTwoID: pastLocationArray[1].id,
                        pastLocationTwoName: pastLocationArray[1].name,
                        pastLocationThreeID: pastLocationArray[2].id,
                        pastLocationThreeName: pastLocationArray[2].name,                        
                    })
                } else {
                    return Promise.resolve();
                }
            })
            .then(() => {
                res.send(getLocationObject(characterID));
                return null;
            })
            .catch(error => {console.log(error)});
    } else {
        res.sendStatus(403);
    }
});

router.get('/getlocations', (req, res) => {
    if (req.isAuthenticated()) {
        res.send(getLocationObject(req.user.character.characterID));
    } else {
        res.sendStatus(403);
    }
})

module.exports = router;