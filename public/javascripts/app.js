const express = require("express")
const bodyParser = require("body-parser")

const app = express()

const secrets = require("../../secrets");
const github = require("octokit").new({ token: secrets.octokitToken });;

app.use(bodyParser.json());
app.use(express.static('public'))

app.set('views', __dirname + '../../views');
app.set('view engine', 'jade');

app.get("/", (req, res) => {
  // let page = req.query.page
  // s3.pullNewBranchS3Image(bucket, paramKey)
  // res.send("<img src='https://s3.amazonaws.com/kalefive.unique.bucket.name/master/cnnImage.png'></img>")
  res.render("index")
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
