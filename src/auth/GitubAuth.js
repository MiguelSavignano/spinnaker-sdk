const crypto = require('crypto')
const axios = require('axios')

class GitubAuth {
  constructor({ clientId, secretId, redirectUrl }) {
    this.state = crypto.randomBytes(8).toString('hex')
    this.config = { clientId, secretId, redirectUrl }
  }

  authorizeUrl({ scope = "user:email" } = {}) {
    return this.buildUrl("https://github.com/login/oauth/authorize", {
      state: this.state,
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUrl,
      scope,
    })
  }

  accessTokenUrl(code) {
    return this.buildUrl("https://github.com/login/oauth/access_token", {
      state: this.state,
      client_id: this.config.clientId,
      client_secret: this.config.secretId,
      code,
    })
  }

  async authorize(code) {
    const tokeUrl = this.accessTokenUrl(code)
    const { data } = await axios.get(tokeUrl, { headers: { accept: 'application/json' } })
    return data
  }

  buildUrl(baseUrl, params) {
    const newUrl = new URL(baseUrl);

    Object.entries(params).forEach(([key, value]) => {
      newUrl.searchParams.append(key, value);
    })
    return newUrl.href
  }
}

module.exports = { GitubAuth }
