const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const app = express();
const menuRouter = require("./router/menuRouter");

const storageConfig = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const fileFilter = function (req, file, cb) {
    if (file.mimetype === "image/png"
        || file.mimetype === "image/jpg"
        || file.mimetype === "image/jpeg"
        || file.mimetype === "image/svg") {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(multer({storage: storageConfig, fileFilter: fileFilter}).single("photo"));

app.use("/", menuRouter);
app.listen(3000);