import readline from 'readline';
import Config from './config';
import MastodonAPI from './mastodonAPI';
import OAuth2Client from './oauth2Client';

class App {
  constructor() {
    this.setup()
      .then(() => this.getToken())
      .then(accessToken => this.configureMastodon(accessToken))
      .then(() => this.getTimeline())
      .catch(err => console.log(err));
  }

  setup() {
    return Promise.all([
      Config.getApplicationConfig(),
      Config.getClientConfig()
    ]).then((configs) => {
      this.applicationConfig = configs[0];
      this.clientConfig = configs[1];
    });
  }

  getToken() {
    return Config.getToken()
      .then(token => token['access_token'])
      .catch(() => this.getNewToken());
  }

  getNewToken() {
    const instanceUrl = this.applicationConfig['instance_url'];
    const clinetId = this.clientConfig['client_id'];
    const clientSecret = this.clientConfig['client_secret'];
    if (
      instanceUrl == null ||
      clinetId == null ||
      clientSecret == null
    ) {
      return Promise.reject('cannot get config');
    }
    this.oauth2Client = new OAuth2Client(instanceUrl, clinetId, clientSecret);
    const redirectUri = this.applicationConfig['redirect_uri'];
    const scope = this.applicationConfig.scope;
    const authUrl = this.oauth2Client.getAuthorizeUrl(redirectUri, scope);
    console.log(`Authorize this app by visiting this url: ${authUrl}`);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      return this.oauth2Client.getOAuthAccessToken(code, redirectUri)
        .then(accessToken => Config.setToken(accessToken));
    });
    return Promise.reject();
  }

  configureMastodon(accessToken) {
    const instanceUrl = this.applicationConfig['instance_url'];
    const apiVersion = this.applicationConfig['api_version'];
    if (instanceUrl == null || apiVersion == null) {
      return Promise.reject('cannot get config');
    }
    const apiUrl = `${instanceUrl}/api/${apiVersion}/`;
    this.mastodon = new MastodonAPI(accessToken, apiUrl);
    return Promise.resolve();
  }

  getTimeline() {
    this.mastodon.get('timelines/home')
      .then(res => console.log(res.data));
  }
}

const app = () => new App();
app();
