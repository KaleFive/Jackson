const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const Octokit = require('octokit');
const secrets = require("./secrets");
const gh = Octokit.new({
    token: secrets.octokitToken
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', (req, res) => {
  let repo = gh.getRepo("kalefive", "testNode")
  debugger
  console.log(req.body)
  res.send('Posting World!')
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
