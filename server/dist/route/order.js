"use strict";
var express = require("express");
var router = express.Router();
var controller = require("../controllers");
router.post("/", controller.postOrder);
router.get("/", controller.getOrder);
module.exports = router;
