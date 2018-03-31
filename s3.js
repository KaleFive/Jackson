const AWS = require("aws-sdk")
const s3 = new AWS.S3()
const fs = require("fs")

function pullMasterS3Image(bucket, paramKey) {
  let key = "master/" + paramKey
  params = { Bucket: bucket, Key: key }
  let image = fs.createWriteStream("screenshots/" + key)
  return new Promise(function(resolve, reject) {
    let stream = s3.getObject(params).createReadStream()
    stream.pipe(image)
      .on("close", function() {
        resolve()
      }).on("error", function() {
        reject()
      });
  });
}

function pullNewBranchS3Image(bucket, paramKey) {
  let key = "qa/" + paramKey
  params = { Bucket: bucket, Key: key }
  let image = fs.createWriteStream("screenshots/" + key)
  return new Promise(function(resolve, reject) {
    let stream = s3.getObject(params).createReadStream()
    stream.pipe(image)
      .on("close", function() {
        resolve()
      }).on("error", function() {
        reject()
      });
  });
}

function uploadDiffToS3(bucket, paramKey) {
  let key = "diff/" + paramKey
  let diffPath = "./screenshots/" + key
  console.log("diffpath " + diffPath)
  fs.readFile(diffPath, function (err,data) {
    if (err) {
      return console.log(err);
    }
    let imageStream = fs.createReadStream(diffPath)
    let params = {
      Bucket: bucket,
      Key: key,
      Body: imageStream,
      ACL: 'public-read'
    };
    return new Promise(function(resolve, reject) {
      console.log("inside the promise")
      s3.putObject(params, function() {
        console.log("right before resolve")
        resolve()
      })
    });
  });
}

module.exports = {
  "pullMasterS3Image": pullMasterS3Image,
  "pullNewBranchS3Image": pullNewBranchS3Image,
  "uploadDiffToS3": uploadDiffToS3
}
