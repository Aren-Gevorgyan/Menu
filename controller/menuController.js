const Navigation = require("../models/navigation");
const Menu = require("../models/menu");

exports.index = function (request, response) {
    response.render("", {});
}

exports.load = function (request, response) {
    Navigation.getNavigationItem().then(res => {
        response.send(res);
    }).catch(err => {
        console.log(err.message);
    })
}

exports.dishes = function (request, response) {
    Menu.getMenuDishes().then(res => {
        response.send(res);
    }).catch(err => {
        console.log(err);
    })
}