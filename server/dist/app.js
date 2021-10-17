"use strict";
require("dotenv").config();
var sequelize = require("./models").sequelize;
var cors = require("cors");
var morgan = require("morgan");
var multer = require("multer");
var cookieParser = require("cookie-parser");
var express = require("express");
var app = express();
var server = require("http").createServer(app);
var userRouter = require("./route/user");
var reviewRouter = require("./route/review");
var cartRouter = require("./route/cart");
var lockerRouter = require("./route/locker");
var caseRouter = require("./route/case");
var orderRouter = require("./route/order");
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
}));
app.use("/user", userRouter);
app.use("/review", reviewRouter);
app.use("/cart", cartRouter);
app.use("/locker", lockerRouter);
app.use("/case", caseRouter);
app.use("/order", orderRouter);
app.get("/", function (req, res) {
    res.send("hello world~~~");
});
var PORT = 80;
server.listen(PORT, function () { return console.log("서버가 열려따..!"); });
//sequelize.sync({ alter: true }
//console.log("서버가 열려따..!")
