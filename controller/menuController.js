const Navigation = require("../models/navigation");
const Menu = require("../models/menu");
const Assortment = require("../models/assortment");
const Modifier = require("../models/modifier");
const ArchiveCategory = require("../models/archiveCategory");
const ArchiveItem = require("../models/archiveItems");
const ArchiveModifier = require("../models/archiveModifier");
const BindAssortmentAndModifier = require("../models/bindAssortmentAndModifier");

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
    const getIdCategory = request.params["name"];
    Menu.getChildMenuCategory(getIdCategory).then(res => {
        response.json(res);
    }).catch(err => {
        console.error(err.message);
    })
}

exports.createCategory = function (request, response) {
    const nameCategory = request.params["name"];
    const menu = new Menu(nameCategory, null);
    menu.createCategory().then(() => {
        response.send("Create category");
    }).catch(err => {
        console.error(err.message);
    });
}

exports.editCategory = function (request, response) {
    const nameCategory = request.params["name"];
    const idCategory = request.params["id"];
    Menu.editCategory(nameCategory, idCategory).then(() => {
        response.send("Edit category");
    }).catch(err => {
        console.error(err.message);
    });
}

exports.deleteCategory = function (request, response) {
    const idCategory = request.params["id"];
    const nameCategory = request.params["name"];
    appendCategoryArchive(idCategory, nameCategory);
    appendAssortmentInArchiveItem(idCategory, nameCategory, response);
}

function appendCategoryArchive(idCategory, nameCategory) {
    Menu.getCategory(idCategory).then(res => {
        let categoryName = res[0].name;
        getCountChildCategoryAndAppendArchive(categoryName, nameCategory)
    })
}

function getCountChildCategoryAndAppendArchive(categoryName, nameCategory) {
    Assortment.getCountChildCategory(nameCategory).then(res => {
        let getCountChildCategory = res[0].countValue;
        const archive = new ArchiveCategory(categoryName, getCountChildCategory);
        archive.appendItem();
    })
}

function appendAssortmentInArchiveItem(id, name, response) {
    Assortment.getAllDataAssortmentThroughName(name).then(res => {
        getAllDataWithTheSameIdFromDishes_nameFromAssortemnt(res, ArchiveItem);
        deleteCategory(id, response);
    }).catch(err => {
        console.error(err.message);
    })
}

function getAllDataWithTheSameIdFromDishes_nameFromAssortemnt(res, value) {
    let assortment;
    for (let assortmentKey in res) {
        assortment = new value(res[assortmentKey].name, res[assortmentKey].price, res[assortmentKey].waiting_time, res[assortmentKey].weight,
            res[assortmentKey].apply_modifiers, res[assortmentKey].description, res[assortmentKey].photo, res[assortmentKey].active, res[assortmentKey].dishes_name);
        assortment.appendItems();
    }
}

function deleteCategory(idCategory, response) {
    Menu.deleteCategory(idCategory).then(() => {
        response.send("Delete category");
    }).catch(err => {
        console.error(err.message);
    });
}

exports.deleteAssortment = function (request, response) {
    const idAssortment = request.params["id"];
    appendAssortmentArchive(idAssortment);
    deleteAssortment(idAssortment, response);
}

function deleteAssortment(idAssortment, response) {
    Assortment.deleteAssortment(idAssortment).then(() => {
        response.send("Delete assortment");
    }).catch(err => {
        console.error(err.message);
    });
}

function appendAssortmentArchive(idAssortment) {
    Assortment.getAllDataAssortmentThroughId(idAssortment).then(res => {
        const archiveItems = new ArchiveItem(res[0].name, res[0].price, res[0].waiting_time, res[0].weight,
            res[0].apply_modifiers, res[0].description, res[0].photo, res[0].active, res[0].dishes_name);
        archiveItems.appendItems();
    });
}

exports.createAssortment = function (request, response) {
    if (!request.body) return response.sendStatus(404);
    const nameCategory = request.params["name"];
    const nameAssortment = request.body.name;
    const price = request.body.price;
    const waiting_time = request.body.waiting_time;
    const weight = request.body.weight;
    const description = request.body.description;
    const photo = request.body.photo;
    const active = request.body.active;
    //get modifiers obj
    const apply_modifiers = request.body.apply_modifiers;
    setValueForCreateAssortment(nameAssortment, price, waiting_time, weight, description, photo, active, nameCategory, response);
    getAssortmentId(nameAssortment, apply_modifiers);
}

function getAssortmentId(name, apply_modifiers) {
    Assortment.getIdAssortmentThroughName(name).then(res => {
        for (let val in apply_modifiers) {
            const bindAssortmentAndModifier = new BindAssortmentAndModifier(res[0].id, apply_modifiers[val]);
            bindAssortmentAndModifier.appendItems();
        }
    })
}

function setValueForCreateAssortment(nameAssortment, price, waiting_time, weight, description, photo, active, nameCategory, response) {
    const assortment = new Assortment(nameAssortment, price, waiting_time, weight, description, photo, active, nameCategory);
    assortment.createAssortment().then(() => {
        console.log(1);
        response.send("Create assortment");
    }).catch(err => {
        console.error(err.message);
    });
}

exports.restoreCategory = function (request, response) {
    const nameCategory = request.params["name"];
    restoreCategory(nameCategory, response);
    restoreAssortmentThroughName(nameCategory, response);
    ArchiveCategory.deleteCategoryDuringRestore(nameCategory);
    ArchiveItem.deleteItemsCategoryDuringRestore(nameCategory).then(() => {
        response.send("Restore category");
    });
}

function restoreCategory(nameCategory) {
    const menu = new Menu(nameCategory, null);
    menu.createCategory().catch(err => {
        console.error(err.message);
    });
}

function restoreAssortmentThroughName(nameCategory, response) {
    ArchiveItem.getAllDataArchiveItem(nameCategory).then(res => {
        getAllDataWithTheSameIdFromDishes_nameFromArchiveItems(res, response);
    }).catch(err => {
        console.error(err.message);
    })
}

function getAllDataWithTheSameIdFromDishes_nameFromArchiveItems(res) {
    let assortment;
    for (let assortmentKey in res) {
        assortment = new Assortment(res[assortmentKey].name, res[assortmentKey].price, res[assortmentKey].waiting_time, res[assortmentKey].weight,
            res[assortmentKey].apply_modifiers, res[assortmentKey].description, res[assortmentKey].photo, res[assortmentKey].active, res[assortmentKey].dishes_name);

        assortment.createAssortment().catch(err => {
            console.error(err.message);
        });
    }
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

    setValueForEditAssortment(nameAssortment, price, waiting_time, weight, apply_modifiers, description, photo, active, idAssortment);
}

function setValueForEditAssortment(nameAssortment, price, waiting_time, weight, apply_modifiers, description, photo, active, idAssortment) {
    Assortment.editAssortment(nameAssortment, price, waiting_time, weight, apply_modifiers, description, photo, active, idAssortment)
        .then(() => {
            response.send("Edit assortment");
        }).catch(err => {
        console.error(err.message);
    });
}

exports.restoreAssortment = function (request, response) {
    const idAssortment = request.params["id"];
    restoreAssortmentThroughId(idAssortment)
    ArchiveItem.deleteItemDishes(idAssortment).then(() => {
        response.send("Restore Assortment");
    });
}

function restoreAssortmentThroughId(idAssortment) {
    ArchiveItem.getAllDataArchiveItemThroughId(idAssortment).then(res => {
        const assortment = new Assortment(res[0].name, res[0].price, res[0].waiting_time, res[0].weight,
            res[0].apply_modifiers, res[0].description, res[0].photo, res[0].active, res[0].dishes_name);

        assortment.createAssortment().catch(err => {
            console.error(err.message);
        });
    })
}

exports.modifier = function (request, response) {
    Modifier.getModifierData().then(res => {
        response.json(res);
    }).catch(err => {
        console.error(err.message);
    })
}

exports.createModifier = function (request, response) {
    const nameModifier = request.params["name"];
    const price = request.params["price"];
    const weight = request.params["weight"];
    const archive = request.params["archive"];
    const setItemArchive = archive === 'true';

    if (setItemArchive) {
        createItemInArchiveModifier(nameModifier, price, weight, response);
    } else if (archive) {
        appendModifierInTableModifier(nameModifier, price, weight, response)
    }
}

function appendModifierInTableModifier(nameModifier, price, weight, response) {
    const modifier = new Modifier(nameModifier, price, weight);

    modifier.createModifier().then(() => {
        response.send("Create modifier");
    }).catch(err => {
        console.error(err.message);
    });
}

exports.editModifier = function (request, response) {
    const nameModifier = request.params["name"];
    const price = request.params["price"];
    const weight = request.params["weight"];
    const id = request.params["id"];

    Modifier.editModifier(nameModifier, weight, price, id).then(() => {
        response.send("Edit modifier");
    }).catch(err => {
        console.error(err.message);
    })
}

exports.deleteModifier = function (request, response) {
    const id = request.params["id"];
    appendModifierArchive(id);
    deleteModifier(id, response);
}

function deleteModifier(id, response) {
    Modifier.deleteModifier(id).then(() => {
        response.send("Delete modifier");
    }).catch(err => {
        console.error(err.message);
    });
}

function appendModifierArchive(id) {
    Modifier.getModifierDataThroughId(id).then(res => {
        const nameModifier = res[0].name;
        const price = res[0].price;
        const weight = res[0].weight;
        createItemInArchiveModifier(nameModifier, price, weight);
    }).catch(err => {
        console.error(err.message);
    });
}

function createItemInArchiveModifier(nameModifier, price, weight, response) {
    const archiveModifier = new ArchiveModifier(nameModifier, price, weight);
    archiveModifier.createItemInArchiveModifier().then(() => {
        response.send("Append item modifier archive");
    }).catch(err => {
        console.error(err.message);
    });
}

exports.restoreModifier = function (request, response) {
    const id = request.params["id"];
    restoreModifier(request, id)
    deleteModifierFromArchive(request, response, id);
}

function restoreModifier(request, id) {
    ArchiveModifier.getModifierDataThroughId(id).then(res => {
        console.log(res);
        const modifier = new Modifier(res[0].name, res[0].weight, res[0].price);
        modifier.createModifier();
    }).catch(err => {
        console.error(err.message);
    });
}

function deleteModifierFromArchive(request, response, id) {
    ArchiveModifier.deleteModifier(id).then(() => {
        response.send("Restore modifier");
    }).catch(err => {
        console.error(err.message);
    });
}




