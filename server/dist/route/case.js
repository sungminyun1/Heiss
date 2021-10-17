"use strict";
var express = require("express");
var router = express.Router();
var controller = require("../controllers");
var upload = require("../middleware/upload");
router.get("/:id", controller.getCase);
router.post("/", controller.postCase);
router.patch("/:id", upload.single("picture"), controller.patchCase);
module.exports = router;
