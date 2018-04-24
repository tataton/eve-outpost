import axios from 'axios';
export const GET_PAST_LOCATIONS = 'GET_PAST_LOCATIONS';

function getPastLocations (pastLocations) {
    return {
        type: GET_PAST_LOCATIONS,
        pastLocations
    }
}

export function getPastLocationsAction () {
    return (dispatch) => {
        return axios.get('/location/pastlocations')
            .then(response => response.data)
            .then(pastLocationArray => dispatch(getPastLocations(pastLocationArray)))
            .catch(error => {})
    }
}