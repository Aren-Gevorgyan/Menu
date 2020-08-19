const express = require("express");
const menuRouter = express.Router();
const menuController = require("../controller/menuController");

menuRouter.get("/dishes/modifier/edit/:name/:weight/:price/:id", menuController.editModifier);
menuRouter.get("/dishes/category/edit/:name/:id", menuController.editCategory);
menuRouter.get("/dishes/category/delete/:id/:name", menuController.deleteCategory);
menuRouter.get("/dishes/category/create/:name", menuController.createCategory);
menuRouter.get("/dishes/assortment/delete/:id", menuController.deleteAssortment);
menuRouter.get("/dishes/modifier/delete/:id", menuController.deleteModifier);
menuRouter.post("/dishes/assortment/edit/:id", menuController.editAssortment);
menuRouter.get("/dishes/category/restore/:name", menuController.restoreCategory);
menuRouter.get("/dishes/assortment/restore/:id", menuController.restoreAssortment);
menuRouter.get("/dishes/modifier/response/:id", menuController.restoreModifier);
menuRouter.post("/dishes/assortment/create/:name", menuController.createAssortment);
menuRouter.post("/dishes/modifier/create/:name", menuController.createModifier);
menuRouter.get("/dishes/assortment/modifier/:id", menuController.modifierOwnedByItem);
menuRouter.get("/dishes/modifier/assortment/:id", menuController.itemOwnedByModifier);
menuRouter.get("/dishes/assortment/:id", menuController.assortmentChild);
menuRouter.get("/dishes", menuController.dishes);
menuRouter.get("/assortment", menuController.assortment);
menuRouter.get("/modifier", menuController.modifier);
menuRouter.get("/load", menuController.load);
menuRouter.get("/", menuController.index);

module.exports = menuRouter;