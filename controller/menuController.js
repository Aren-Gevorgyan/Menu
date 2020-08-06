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

//new
exports.deleteCategory = function (request, response) {
    const nameCategory = request.params["name"];
    Menu.deleteCategory(nameCategory).then(res => {
        response.send("Delete category");
    }).catch(err => {
        console.error(err.message);
    });
}
//new
exports.deleteAssortment = function (request, response) {
    const idAssortment = request.params["id"];
    Assortment.deleteAssortment(idAssortment).then(res => {
        response.send("Delete assortment");
    }).catch(err => {
        console.error(err.message);
    });
}
//new
exports.createAssortment = function (request, response) {
    if (!request.body) return response.sendStatus(404);
    console.log(request.body);
    const idCategory = request.body.id;
    const nameAssortment = request.body.name;
    const price = request.body.price;
    const waiting_time = request.body.waiting_time;
    const weight = request.body.apply_modifiers;
    const description = request.body.description;
    const photo = request.body.photo;
    const active = request.body.active;

    const assortment = new Assortment(nameAssortment, price, waiting_time, weight, description, photo, active, idCategory);

    assortment.createAssortment().then(res => {
        response.send("Create assortment");
    }).catch(err => {
        console.error(err.message);
    });
}
//new
exports.editAssortment = function (request, response) {
    if (!request.body) return response.sendStatus(404);
    const idAssortment = request.params["id"];
    const nameAssortment = request.body.name;
    const price = request.body.price;
    const waiting_time = request.body.waiting_time;
    const weight = request.body.apply_modifiers;
    const apply_modifiers = request.body.appli_modifiers;
    const description = request.body.description;
    const photo = request.body.photo;
    const active = request.body.active;

    Assortment.editAssortment(nameAssortment, price, waiting_time, weight, apply_modifiers, description, photo, active, idAssortment)
        .then(res => {
            response.send("Edit assortment");
        }).catch(err => {
        console.error(err.message);
    });
}
