const authURL = '/auth/read/login';
const windowName = 'EVE_SSO_login';
const windowSpecs = 'width=400,height=500';

export function oauthLogin () {
    window.open(authURL, windowName, windowSpecs);
}

export const oauthLogoutAddress = '/auth/logout';