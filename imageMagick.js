const AWS = require("aws-sdk")
const s3 = new AWS.S3()
const fs = require("fs")
const blinkDiff = require("blink-diff")

let bucket = "kalefive.unique.bucket.name"
let key = "cnnImage.png"


function runBlinkDiff() {
  let diff = new blinkDiff({
    // imageAPath: "./Screenshots/master/" + page + ".png",
    // imageBPath: "./Screenshots/new/" + page + ".png",
    imageAPath: "./master.png",
    imageBPath: "./qa.png",

    // thresholdType: blinkDiff.THRESHOLD_PERCENT,
    // threshold: 0.01, // 1% threshold

    imageOutputPath: "./diffResult.png"
  })

  diff.run(function (error, result) {
    if (error) {
      throw error
    } else {
      console.log(diff.hasPassed(result.code) ? "Passed" : "Failed")
      console.log("Found " + result.differences + " differences.")
    }
  })
};
runBlinkDiff()
