export const SET_USER = 'SET_USER';
export const SET_USER_ERROR = 'SET_USER_ERROR';
export const LOG_OUT_USER = 'LOG_OUT_USER';

function setUser (user) {
    return {
        type: SET_USER,
        user
    }
}

function setUserError (error) {
    return {
        type: SET_USER_ERROR,
        error
    }
}

function logOutUser () {
    return {
        type: LOG_OUT_USER
    }
}

export function retrieveUserAction () {
    return (dispatch) => {
        return fetch('/auth/getuserinfo', {credentials: 'include'})
            .then(response => response.json())
            .then(user => dispatch(setUser(user)))
            .catch(error => dispatch(setUserError(error)))
    }
}

export function logOutUserAction () {
    return (dispatch) => {
        return fetch('/auth/logout', {credentials: 'include'})
            .then(response => response.headers)
            .then(() => dispatch(logOutUser()))
    }
}