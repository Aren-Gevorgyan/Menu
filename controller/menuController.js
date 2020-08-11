const Navigation = require("../models/navigation");
const Menu = require("../models/menu");
const Assortment = require("../models/assortment");
const Modifier = require("../models/modifier");
const ArchiveCategory = require("../models/archiveCategory");
const ArchiveItem = require("../models/archiveItems");

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
        response.json(res);
    }).catch(err => {
        console.error(err.message);
    })
}

exports.assortment = function (request, response) {
    const getIdCategory = request.params["id"];
    Menu.getMenuCategory(getIdCategory).then(res => {
        response.json(res);
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
    const idCategory = request.params["id"];
    appendCategoryArchive(idCategory);
    appendAssortmentInArchiveItem(idCategory, response);
}

function appendCategoryArchive(idCategory) {
    Menu.getCategory(idCategory).then(res => {
        let categoryName = res[0].name;
        console.log(1)
        getCountChildCategoryAndAppendArchive(categoryName, idCategory)
    })
}

function getCountChildCategoryAndAppendArchive(categoryName, idCategory) {
    Assortment.getCountChildCategory(idCategory).then(res => {
        let getCountChildCategory = res[0].countValue;
        console.log(getCountChildCategory);
        const archive = new ArchiveCategory(categoryName, getCountChildCategory);
        archive.appendItem();
    })
}

function appendAssortmentInArchiveItem(id, response) {
    Assortment.getAllDataAssortment(id).then(res => {
        let archiveItem;
        getAllDataWithTheSameIdFromAssortment_id(archiveItem, res);
        deleteCategory(id, response);
    }).catch(err => {
        console.error(err.message);
    })
}

function getAllDataWithTheSameIdFromAssortment_id(archiveItem, res){
    for (const assortmentKey in res) {
        archiveItem = new ArchiveItem(res[assortmentKey].name, res[assortmentKey].price, res[assortmentKey].waiting_time, res[assortmentKey].weight,
            res[assortmentKey].apply_modifiers, res[assortmentKey].description, res[assortmentKey].photo, res[assortmentKey].active, res[assortmentKey].assortment_id, 1);
        archiveItem.appendItems();
    }
}

function deleteCategory(idCategory, response) {
    console.log(3);
    Menu.deleteCategory(idCategory).then(res => {
        response.send("Delete category");
    }).catch(err => {
        console.error(err.message);
    });
}

exports.deleteAssortment = function (request, response) {
    const idAssortment = request.params["id"];
    Assortment.deleteAssortment(idAssortment).then(res => {
        response.send("Delete assortment");
    }).catch(err => {
        console.error(err.message);
    });
}

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

exports.createModifier = function (request, response) {
    const nameModifier = request.params["name"];
    const price = request.params["price"];
    const weight = request.params["weight"];
    const modifier = new Modifier(nameModifier, price, weight);
    modifier.createModifier().then(res => {
        response.send("Create modifier");
    }).catch(err => {
        console.error(err.message);
    });
}

exports.modifier = function (request, response) {
    Modifier.getModifierData().then(res => {
        response.json(res);
    }).catch(err => {
        console.error(err.message);
    })
}

exports.editModifier = function (request, response) {
    Modifier.editModifier().then(res => {
        response.json(res);
    }).catch(err => {
        console.error(err.message);
    })
}