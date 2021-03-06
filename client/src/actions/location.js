import axios from 'axios';
export const SET_LOCATION_LOCAL = 'SET_LOCATION_LOCAL';

export function setLocationLocalAction (location) {
    return {
        type: SET_LOCATION_LOCAL,
        location
    }
}

export function setLocationRemoteAction (location) {
    return (dispatch) => {
        return axios.post('/location/setlocation', {location})
            .then(response => response.headers)
            .then(() => dispatch(setLocationLocalAction(location)))
            .catch(error => {})
    }
}

export function getLocationObjectRemoteAction () {
    return (dispatch) => {
        return axios.get('/location/getlocations')
            .then(response => response.data)
            .then(location => dispatch(setLocationLocalAction(location)))
            .catch(error => {})
    }
}