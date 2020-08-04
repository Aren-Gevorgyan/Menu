const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const app = express();
const menuRouter = require("./router/menuRouter");
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use("/", urlencodedParser, menuRouter);
app.listen(3000);