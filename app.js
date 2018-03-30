const express = require("express")
const bodyParser = require("body-parser")

const app = express()

const Octokit = require("octokit");
const secrets = require("./secrets");
const gh = Octokit.new({ token: secrets.octokitToken });
const Git = require("nodegit");

const AWS = require("aws-sdk")
const s3 = new AWS.S3()

let bucket = "kalefive.unique.bucket.name"

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.get("/clonebranch", (req, res) => {
  // code inside of git.js
})

app.post("/", (req, res) => {
  let repoName = req.body.repository.name
  let branchName = req.body.ref.split("/").pop()
  let repo = gh.getRepo("kalefive", repoName)
  res.send("Posting World!")
})

app.listen(3000, () => console.log("Example app listening on port 3000!"))
