"use strict";
var multer = require("multer");
var multerS3 = require("multer-s3");
var AWS = require("aws-sdk");
var s3 = new AWS.S3({
    accessKeyId: process.env.S3_IMAGE_ID,
    secretAccessKey: process.env.S3_IMAGE_SECRET,
    region: "ap-northeast-2",
});
var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "heiss-images",
        acl: "public-read",
        key: function (req, file, cb) {
            cb(null, Date.now() + "." + file.originalname.split(".").pop()); // 이름 설정
        },
    }),
}, "NONE");
module.exports = upload;
