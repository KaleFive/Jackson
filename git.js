const Git = require("nodegit");

let cloneOptions = {};
cloneOptions["checkoutBranch"] = "master"
Git.Clone("https://github.com/kalefive/crunch-diff", "./tmp/crunch-diff", cloneOptions)
  .then(function(repo) {
    console.log("got the repo")
  })

// after clone we'd run .....
//   cd tmp/crunch-diff
//   npm install
//   docker-compose up --scale chrome=4
//   ./node_modules/.bin/nightwatch
