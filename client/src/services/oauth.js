const windowName = 'EVE_SSO_login';
const windowSpecs = 'width=400,height=500';

export function oauthLogin (accessType) {
    return function () {
        const authURL = `/auth/${accessType}/login`;
        window.open(authURL, windowName, windowSpecs);
    }
}

export const oauthLogoutAddress = '/auth/logout';