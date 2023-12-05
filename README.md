### Spinnaker SDK

HTTP client to interact with [spinnaker API](https://spinnaker.io/docs/reference/api/docs.html)


## Github OAuth 2.0

1. Get Client ID and Secret
Consult the [GitHub OAuth 2.0 documentation](https://docs.github.com/es/developers/apps/building-oauth-apps/authorizing-oauth-apps) and [register a new OAuth 2.0 application](https://github.com/settings/applications/new) to obtain a client ID and client secret.


2. Generate Github access token

```
export CLIENT_ID=$GH_APP_CLIENT_ID
export SECRET_ID=$GH_APP_SECRET_ID
```


```
spinnaker-sdk github-auth
```
Should generate `token.json` file.

## API request

Fetch applications
```js
const { SpinnakerClient } = require('spinnaker-sdk')
const tokenData = require('./token.json')

const spinnaker = new SpinnakerClient('http://localhost:8084', tokenData)

async function run() {
  await spinnaker.login()
  const { data } = await spinnaker.axios.get(`/applications`)
  console.log(data)
}
run()
```
