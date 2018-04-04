export const DISPLAY_ERROR = 'DISPLAY_ERROR';
export const DISMISS_ERROR = 'DISMISS_ERROR';

export function displayErrorAction (errorMessage) {
    return {
        type: DISPLAY_ERROR,
        errorMessage
    }
}

export function dismissErrorAction () {
    return {
        type: DISMISS_ERROR
    }
}