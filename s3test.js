const s3 = require("./s3")
const fs = require("fs")
const blinkDiff = require("./blinkDiff")

function testFunction() {
  let bucket = "kalefive.unique.bucket.name"
  let key = "cnnImage.png"
  Promise.all([s3.pullNewBranchS3Image(bucket, key), s3.pullMasterS3Image(bucket, key)])
    .then(function() {
      return blinkDiff.run(key)
    }).then(function() {
      return s3.uploadDiffToS3(bucket, key)
    }).then(function() {
      console.log("Success!")
    }).catch(function(error) {
      console.log("This is the error " + error)
    });
}

testFunction()
