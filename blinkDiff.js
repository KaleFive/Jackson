const fs = require("fs")
const blinkDiff = require("blink-diff")

function run(page) {
  let diff = new blinkDiff({
    imageAPath: "./screenshots/master/" + page,
    imageBPath: "./screenshots/qa/" + page,

    // thresholdType: blinkDiff.THRESHOLD_PERCENT,
    // threshold: 0.01, // 1% threshold

    imageOutputPath: "./screenshots/diff/" + page
  })

  return new Promise(function(resolve, reject) {
    diff.run(function (error, result) {
      if (error) {
        reject(error)
      } else {
        resolve()
        console.log(diff.hasPassed(result.code) ? "Passed" : "Failed")
        console.log("Found " + result.differences + " differences.")
      }
    });
  });
};

module.exports = {
  "run": run
}
