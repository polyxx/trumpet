import Mastodon from 'mastodon';

const TIMEOUT_MS = 60 * 1000;

export default class MastodonAPI {
  constructor(accessToken, apiUrl) {
    this.mastodon = new Mastodon({
      access_token: accessToken,
      timeout_ms: TIMEOUT_MS,
      api_url: apiUrl
    });
  }

  get(path, params = {}) {
    return this.mastodon.get(path, params);
  }

  post(path, params = {}) {
    return this.mastodon.post(path, params);
  }
}
