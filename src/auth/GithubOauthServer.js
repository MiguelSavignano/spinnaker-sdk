// https://docs.github.com/en/developers/apps/building-github-apps/identifying-and-authorizing-users-for-github-apps
const express = require('express')
const fs = require('fs')
const { GitubAuth } = require('./GitubAuth')

const app = express()
const { PORT = 8085 } = process.env

const gitubAuth = new GitubAuth({
  clientId: process.env.CLIENT_ID,
  secretId: process.env.SECRET_ID,
  redirectUrl: `http://localhost:${PORT}/callback`
})

app.get('/callback', async (req, res) => {
  const data = await gitubAuth.authorize(req.query.code)
  res.send(data)
  fs.writeFileSync('token.json', JSON.stringify(data, null, 2))
  console.log("Generated token.json")
  process.exit(0)
})


const authUrl = gitubAuth.authorizeUrl()

module.exports = { GithubOauthServer: { app, authUrl, gitubAuth, PORT } }
