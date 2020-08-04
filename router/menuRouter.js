const express = require("express");
const menuRouter = express.Router();
const menuController = require("../controller/menuController");

menuRouter.get("/dishes/steaks", menuController.steaks);
menuRouter.get("/dishes/burgers", menuController.burgers);
menuRouter.get("/dishes/salads", menuController.salads);
menuRouter.get("/dishes", menuController.dishes);
menuRouter.get("/load", menuController.load);
menuRouter.get("/", menuController.index);

module.exports = menuRouter;