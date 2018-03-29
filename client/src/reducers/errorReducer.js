import { SET_ERROR } from '../actions/user';

function errorReducer (state = {}, action) {
    switch(action.type) {
        case SET_ERROR :
          return action.error;
        default :
          return state;
    }
}

export default errorReducer;