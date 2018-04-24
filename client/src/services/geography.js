import axios from 'axios';

export function getSystemsInRegion (regionID) {
    return axios.get(`/geography/systemsinregion/${regionID}`)
        .then(response => response.data.systemArray)
        .catch((error) => {console.log(error)})
}

export function getStationsInSystem (solarSystemID) {
    return axios.get(`/geography/stationsinsystem/${solarSystemID}`)
        .then(response => response.data.stationArray)
        .catch((error) => {console.log(error)})
}

export function getStructuresBySystemName (solarSystemName, solarSystemID) {
    return axios.get(`/geography/structuresbysystemname/${solarSystemName}/${solarSystemID}`)
        .then(response => response.data.structureArray)
        .catch((error) => {console.log(error)})
}

export function getStructuresBySystemID (solarSystemID) {
    return axios.get(`/geography/structuresbysystemid/${solarSystemID}`)
        .then(response => response.data.structureArray)
        .catch((error) => {console.log(error)})
}