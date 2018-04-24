import { GET_PAST_LOCATIONS } from '../actions/pastLocations';

function pastLocationsReducer (state = [], action) {
    switch(action.type) {
        case GET_PAST_LOCATIONS :
            return action.pastLocations;
        default :
            return state;
    }
}

export default pastLocationsReducer;