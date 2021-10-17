"use strict";
var express = require("express");
var router = express.Router();
var controller = require("../controllers");
var upload = require("../middleware/upload");
router.get("/", controller.getAllReview);
router.get("/:id", controller.getDetailReview);
router.post("/like", controller.postLikeReview);
router.post("/", upload.array("picture", 10), controller.postReview);
router.patch("/:id", upload.array("picture", 10), controller.patchReview);
router.delete("/:id", controller.deleteReview);
module.exports = router;
