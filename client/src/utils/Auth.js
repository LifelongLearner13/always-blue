import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientID: process.env.REACT_APP_AUTH0_CLIENTID,
    redirectUri: process.env.REACT_APP_AUTH0_REDIRECTURI,
    responseType: 'token id_token',
    scope: 'openid',
  });

  login() {
    this.auth0.authorize();
  }
}
