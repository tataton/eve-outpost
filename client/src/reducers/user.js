import { SET_USER, LOG_OUT_USER } from '../actions/user';

function user (state = {}, action) {
    switch(action.type) {
        case SET_USER :
          return action.user;
        case LOG_OUT_USER :
          return {};
        default :
          return state;
    }
}

export default user;