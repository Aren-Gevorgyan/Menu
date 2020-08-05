const express = require("express");
const menuRouter = express.Router();
const menuController = require("../controller/menuController");

menuRouter.get("/dishes/category/create/:name", menuController.createCategory);
menuRouter.get("/dishes/category/edit/:name/:id", menuController.editCategory);
menuRouter.get("/dishes/category/delete/:name", menuController.deleteCategory);
menuRouter.get("/dishes/assortment/delete/:id", menuController.deleteAssortment);
menuRouter.get("/dishes/assortment/:id", menuController.assortment);
menuRouter.get("/dishes", menuController.dishes);
menuRouter.get("/load", menuController.load);
menuRouter.get("/", menuController.index);

module.exports = menuRouter;