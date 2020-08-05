const Navigation = require("../models/navigation");
const Menu = require("../models/menu");
const Assortment = require("../models/assortment");

exports.index = function (request, response) {
    response.send("Hello");
}

exports.load = function (request, response) {
    Navigation.getNavigationItem().then(res => {
        response.send(res);
    }).catch(err => {
        console.error(err.message);
    })
}

exports.dishes = function (request, response) {
    Menu.getMenuDishes().then(res => {
        response.send(res);
    }).catch(err => {
        console.error(err.message);
    })
}

exports.assortment = function (request, response) {
    const getIdCategory = request.params["id"];
    Menu.getMenuCategory(getIdCategory).then(res => {
        response.send(res);
    }).catch(err => {
        console.error(err.message);
    })
}

exports.createCategory = function (request, response) {
    const nameCategory = request.params["name"];
    const menu = new Menu(nameCategory, null);
    menu.createCategory().then(res => {
        response.send("Create category");
    }).catch(err => {
        console.error(err.message);
    });
}

exports.editCategory = function (request, response) {
    const nameCategory = request.params["name"];
    const idCategory = request.params["id"];
    Menu.editCategory(nameCategory, idCategory).then(res => {
        response.send("Edit category");
    }).catch(err => {
        console.error(err.message);
    });
}

exports.deleteCategory = function (request, response) {
    const nameCategory = request.params["name"];
    Menu.deleteCategory(nameCategory).then(res => {
        response.send("Delete category");
    }).catch(err => {
        console.error(err.message);
    });
}

exports.deleteAssortment = function (request, response) {
    const idAssortment = request.params["id"];
    Assortment.deleteAssortment(idAssortment).then(res => {
        response.send("delete Assortment");
    }).catch(err => {
        console.error(err.message);
    });
}