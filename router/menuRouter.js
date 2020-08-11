const express = require("express");
const menuRouter = express.Router();
const menuController = require("../controller/menuController");

menuRouter.get("/dishes/category/edit/:name/:id", menuController.editCategory);
menuRouter.get("/modifier/create/:name/:weight/:price", menuController.createModifier);
menuRouter.get("/dishes/category/create/:name", menuController.createCategory);
menuRouter.get("/dishes/category/delete/:id", menuController.deleteCategory);
menuRouter.get("/dishes/assortment/delete/:id", menuController.deleteAssortment);
menuRouter.post("/dishes/assortment/edit/:id", menuController.editAssortment);
menuRouter.post("/dishes/assortment/create", menuController.createAssortment);
menuRouter.get("/dishes/assortment/:id", menuController.assortment);
menuRouter.get("/dishes", menuController.dishes);
menuRouter.get("/modifier", menuController.modifier);
menuRouter.get("/load", menuController.load);
menuRouter.get("/", menuController.index);

module.exports = menuRouter;