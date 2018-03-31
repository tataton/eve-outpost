export const DISPLAY_ERROR = 'DISPLAY_ERROR';
export const DISMISS_ERROR = 'DISMISS_ERROR';

export function displayErrorAction (error) {
    return {
        type: DISPLAY_ERROR,
        error
    }
}

export function dismissErrorAction () {
    return {
        type: DISMISS_ERROR
    }
}