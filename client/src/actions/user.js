import axios from 'axios';
export const SET_USER = 'SET_USER';
export const LOG_OUT_USER = 'LOG_OUT_USER';
export const OPEN_OAUTH = 'OPEN_OAUTH';

function setUser (user) {
    return {
        type: SET_USER,
        user
    }
}

function logOutUser () {
    return {
        type: LOG_OUT_USER
    }
}

export function getUserAction () {
    return (dispatch) => {
        return axios.get('/auth/getuserinfo')
            .then(response => response.data)
            .then(user => dispatch(setUser(user)))
            .catch(error => {})
    }
}

export function logOutUserAction () {
    return (dispatch) => {
        return axios('/auth/logout')
            .then(response => response.headers)
            .then(() => dispatch(logOutUser()))
    }
}