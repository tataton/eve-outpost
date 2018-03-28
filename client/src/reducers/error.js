import { SET_USER_ERROR } from '../actions/user';

function error (state = {}, action) {
    switch(action.type) {
        case SET_USER_ERROR :
          return action.error;
        default :
          return state;
    }
}