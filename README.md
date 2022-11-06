### Spinnaker SDK


## Github Auth2

Is required fetch the github token using a Github app

```
spinnaker-sdk github-auth
```

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
