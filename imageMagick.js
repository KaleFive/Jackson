const AWS = require("aws-sdk")
const s3 = new AWS.S3()
const fs = require("fs")

let bucket = "kalefive.unique.bucket.name"
let key = "cnnImage.png"

function pullMasterS3Image() {
  params = { Bucket: bucket, Key: "master/" + key }
  let image = fs.createWriteStream("./writtenFile.png")
  s3.getObject(params).createReadStream().pipe(image)
}
pullMasterS3Image()
