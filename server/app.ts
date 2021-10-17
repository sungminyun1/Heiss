require("dotenv").config();
const { sequelize } = require("./models");
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const server = require("http").createServer(app);

const userRouter = require("./route/user");
const reviewRouter = require("./route/review");
const cartRouter = require("./route/cart");
const lockerRouter = require("./route/locker");
const caseRouter = require("./route/case");
const orderRouter = require("./route/order");

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
	cors({
		origin: true,
		credentials: true,
		methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
	})
);

app.use("/user", userRouter);
app.use("/review", reviewRouter);
app.use("/cart", cartRouter);
app.use("/locker", lockerRouter);
app.use("/case", caseRouter);
app.use("/order", orderRouter);

app.get("/", (req, res) => {
	res.send("hello world~~~");
});



const PORT = 80;
server.listen(PORT, () => console.log("서버가 열려따..!"));
//sequelize.sync({ alter: true }
//console.log("서버가 열려따..!")
