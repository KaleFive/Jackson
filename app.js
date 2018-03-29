const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const Octokit = require('octokit');
const secrets = require("./secrets");
const gh = Octokit.new({ token: secrets.octokitToken });
const Git = require("nodegit");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.get("/branch", (req, res) => {
  Git.Clone("https://github.com/kalefive/testNode", "./tmp")
    .then(function(repo) {
      console.log("got the repo")
    })
  res.send("Hello World!")
})

app.post("/", (req, res) => {
  let repoName = req.body.repository.name
  let branchName = req.body.ref.split("/").pop()
  let repo = gh.getRepo("kalefive", repoName)
  res.send("Posting World!")
})

app.listen(3000, () => console.log("Example app listening on port 3000!"))
