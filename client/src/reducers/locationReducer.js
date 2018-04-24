import { SET_LOCATION_LOCAL } from '../actions/location';

function locationReducer (state = {}, action) {
    switch(action.type) {
        case SET_LOCATION_LOCAL :
            return action.location;
        default :
            return state;
    }
}

export default locationReducer;