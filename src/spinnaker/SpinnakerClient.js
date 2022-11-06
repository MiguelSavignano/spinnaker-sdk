const axios = require('axios')

class SpinnakerClient {
  constructor(baseURL, { access_token } = {}) {
    this.axios = axios.create({
      baseURL,
      maxRedirects: 0,
      headers: { Authorization: `Bearer ${access_token}` },
    })
  }

  async login() {
    const { headers } = await this.axios.get(`/login`, { validateStatus: this.validSatusOnRedirect })
    const cookie = headers['set-cookie'][0]
    this.axios.defaults.headers = { 'Cookie': cookie }

    return this
  }

  validSatusOnRedirect(status) {
    return status >= 200 && status <= 303
  }
}

module.exports = { SpinnakerClient }
