import { OAuth2 } from 'oauth';

export default class OAuth2Client {
  constructor(instanceUrl, clientId, clientSecret) {
    this.clientId = clientId;
    this.oauth2Client = new OAuth2(
      clientId,
      clientSecret,
      instanceUrl,
      null,
      '/oauth/token'
    );
  }

  getAuthorizeUrl(
    redirectUri = 'urn:ietf:wg:oauth:2.0:oob',
    scope = 'read'
  ) {
    return this.oauth2Client.getAuthorizeUrl({
      client_id: this.clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope
    });
  }

  getOAuthAccessToken(code, redirectUri = 'urn:ietf:wg:oauth:2.0:oob') {
    return new Promise((resolve, reject) => {
      this.oauth2Client.getOAuthAccessToken(code, {
        grant_type: 'authorization_code',
        redirect_uri: redirectUri
      }, (err, content) => {
        if (err != null) {
          reject(err);
        } else {
          resolve(content);
        }
      });
    });
  }
}
