import { DISPLAY_ERROR } from '../actions/error';
import { DISMISS_ERROR } from '../actions/error';

function errorReducer (state = '', action) {
    switch(action.type) {
        case DISPLAY_ERROR :
          return action.errorMessage;
        case DISMISS_ERROR :
          return '';
        default :
          return state;
    }
}

export default errorReducer;