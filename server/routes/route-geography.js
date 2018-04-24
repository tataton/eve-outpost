const express = require('express');
const router = express.Router();
const Promise = require('bluebird');
const { PublicStructure, SolarSystem, Station, User } = require('../services/service-database');
const { getAllStructuresInSystem, getStructureInfoWithoutMarket } = require('../services/service-http');

router.get('/systemsinregion/:regionid', (req, res) => {
    SolarSystem.findAll({
        where: {regionID: req.params.regionid},
        attributes: ['solarSystemID', 'solarSystemName']
    })
    .map(system => system.get({plain: true}))
    .then(systemArray => {
        res.send({systemArray})
    })
    .catch(error => {console.log(error)})
});

router.get('/stationsinsystem/:solarsystemid', (req, res) => {
    Station.findAll({
        where: {solarSystemID: req.params.solarsystemid},
        attributes: ['stationID', 'stationName']
    })
    .map(station => station.get({plain: true}))
    .then(stationArray => {
        res.send({stationArray})
    })
    .catch(error => {console.log(error)})
});

router.get('/structuresbysystemname/:solarsystemname/:solarsystemid', (req, res) => {
    if (req.isAuthenticated()) {
        User.findOne({where: {characterID: req.user.character.CharacterID}})
            .then(user => {
                return getAllStructuresInSystem(user, req.params.solarsystemname, req.user.character.accessType)
                    .then(structureIDArray => {
                        return Promise.map(structureIDArray, structureID => {
                            return PublicStructure.findOne({
                                where: {structureID},
                                attributes: ['structureID', 'structureName', 'solarSystemID', 'typeID']
                            })
                            .then(structure => {
                                if (structure) {
                                    return (structure.solarSystemID == req.params.solarsystemid) ?
                                        structure.get({plain: true}) :
                                        null
                                } else {
                                    return getStructureInfoWithoutMarket(user, structureID, req.user.character.accessType)
                                        .then(privateStructure => {
                                            return (privateStructure.solarSystemID == req.params.solarsystemid) ?
                                                privateStructure :
                                                null
                                        })
                                }
                            })
                        })
                    })
                    .then(resultArray => {
                        return resultArray.filter(object => (object !== null))
                    })
            })
            .then(structureArray => {
                res.send({structureArray})
            })
            .catch(error => {
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});

router.get('/structuresbysystemid/:solarsystemid', (req, res) => {
    PublicStructure.findAll({
        where: {solarSystemID: req.params.solarsystemid},
        attributes: ['structureID', 'structureName', 'solarSystemID', 'typeID']
    })
    .map(structure => structure.get({plain: true}))
    .then(structureArray => {
        res.send({structureArray})
    })
    .catch(error => {console.log(error)})
});

module.exports = router;