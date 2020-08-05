const Navigation = require("../models/navigation");
const Menu = require("../models/menu");

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

exports.steaks = function (request, response) {
    Menu.getMenuCategory(1).then(res => {
        response.send(res);
    }).catch(err => {
        console.error(err.message);
    })
}

exports.burgers = function (request, response) {
    Menu.getMenuCategory(2).then(res => {
        response.send(res);
    }).catch(err => {
        console.error(err.message);
    })
}

exports.salads = function (request, response) {
    Menu.getMenuCategory(3).then(res => {
        response.send(res);
    }).catch(err => {
        console.error(err.message);
    })
}

exports.createCategory = function (request, response) {
    const nameCategory = request.params["name"];
    console.log(nameCategory);
    const menu = new Menu(nameCategory, null);
    menu.createCategory().then(res=>{
        response.send("Create category");
    }).catch(err=>{
        console.error(err.message);
    });
}

exports.editCategory = function (request, response) {
    const nameCategory = request.params["name"];
    const idCategory = request.params["id"];
    Menu.editCategory(nameCategory, idCategory).then(res=>{
        response.send("Edit category");
    }).catch(err=>{
        console.error(err.message);
    });
}

exports.deleteCategory = function (request, response) {
    const nameCategory = request.params["name"];
    console.log(nameCategory);
    Menu.deleteCategory(nameCategory).then(res=>{
        response.send("Delete category");
    }).catch(err=>{
        console.error(err.message);
    });
}