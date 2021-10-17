"use strict";
var express = require("express");
var router = express.Router();
var controller = require("../controllers");
var upload = require("../middleware/upload");
router.get("/", controller.getLocker);
router.post("/", upload.single("picture"), controller.postLocker);
router.delete("/:id", controller.deleteLocker);
module.exports = router;
