const express = require("express")
const bodyParser = require("body-parser")

const app = express()

const secrets = require("./secrets");
const github = require("octokit").new({ token: secrets.octokitToken });;
const nodegit = require("nodegit");

const s3 = require("./s3")
const blinkDiff = require("./blinkDiff")

app.use(bodyParser.json());

app.get("/", (req, res) => {
  // let page = req.query.page
  // s3.pullNewBranchS3Image(bucket, paramKey)
  res.send("Hello World!")
})

// https://stackoverflow.com/questions/28449363/why-is-this-http-request-not-working-on-aws-lambda
// set up lambda function to trigger on S3 upload, which will make a http request to this endpoint to run blink-diff
app.get("/runBlinkDiff", (req, res) => {
  let bucket = req.query.bucket
  let key = req.query.key
  Promise.all([s3.pullNewBranchS3Image(bucket, key), s3.pullMasterS3Image(bucket, key)])
    .then(function() {
      return blinkDiff.run(key)
    }).then(function() {
      return s3.uploadDiffToS3(bucket, key)
    }).then(function() {
      res.send("Success")
    });
})


app.get("/clonebranch", (req, res) => {
  // code inside of git.js
})

app.post("/", (req, res) => {
  let repoName = req.body.repository.name
  let branchName = req.body.ref.split("/").pop()
  let repo = github.getRepo("kalefive", repoName)
  res.send("Posting World!")
})

app.listen(3000, () => console.log("Example app listening on port 3000!"))
