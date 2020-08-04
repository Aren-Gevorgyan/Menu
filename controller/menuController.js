const Navigation = require("../models/navigation");
const Menu = require("../models/menu");

exports.index = function (request, response) {
    response.render("", {});
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
    Menu.getMenuSteaks().then(res => {
        response.send(res);
    }).catch(err => {
        console.error(err.message);
    })
}

exports.burgers = function (request, response) {
    Menu.getMenuBurgers().then(res => {
        response.send(res);
    }).catch(err => {
        console.error(err.message);
    })
}

exports.salads = function (request, response) {
    Menu.getMenuSalads().then(res => {
        response.send(res);
    }).catch(err => {
        console.error(err.message);
    })
}

