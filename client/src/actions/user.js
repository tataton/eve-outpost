import { DISPLAY_ERROR } from './error';
export const SET_USER = 'SET_USER';
export const LOG_OUT_USER = 'LOG_OUT_USER';
export const OPEN_OAUTH = 'OPEN_OAUTH';

function setUser (user) {
    return {
        type: SET_USER,
        user
    }
}

function displayError (error) {
    return {
        type: DISPLAY_ERROR,
        error
    }
}

function logOutUser () {
    return {
        type: LOG_OUT_USER
    }
}

export function getUserAction () {
    return (dispatch) => {
        return fetch('/auth/getuserinfo', {credentials: 'include'})
            .then(response => response.json())
            .then(user => dispatch(setUser(user)))
            .catch(error => dispatch(displayError(error)))
    }
}

export function logOutUserAction () {
    return (dispatch) => {
        return fetch('/auth/logout', {credentials: 'include'})
            .then(response => response.headers)
            .then(() => dispatch(logOutUser()))
    }
}