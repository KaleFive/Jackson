const AWS = require("aws-sdk")
const s3 = new AWS.S3()
const fs = require("fs")

// let bucket = "kalefive.unique.bucket.name"
// let paramKey = "cnnImage.png"

function pullMasterS3Image(bucket, paramKey) {
  let key = "master/" + paramKey
  params = { Bucket: bucket, Key: key }
  let image = fs.createWriteStream("screenshots/" + key)
  s3.getObject(params).createReadStream().pipe(image)
}

function pullNewBranchS3Image(bucket, paramKey) {
  let key = "qa/" + paramKey
  params = { Bucket: bucket, Key: key }
  let image = fs.createWriteStream("screenshots/" + key)
  s3.getObject(params).createReadStream().pipe(image)
}
// pullMasterS3Image(bucket, paramKey)
// pullNewBranchS3Image(bucket, paramKey)

module.exports = {
  "pullMasterS3Image": pullMasterS3Image,
  "pullNewBranchS3Image": pullNewBranchS3Image
}
