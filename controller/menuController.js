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
    Assortment.getAllDataAssortment().then(res => {
        response.json(res);
    }).catch(err => {
        console.error(err.message);
    })
}

exports.modifierOwnedByItem = function (request, response) {
    const id = request.params["id"];
    returnModifiersOwnedByItem(id).then(res => {
        response.json(res);
    });
}

function returnModifiersOwnedByItem(id) {
    return new Promise(resolve => {
        getModifiersOwnedByItem(id, resolve)
    })
}

function getModifiersOwnedByItem(id, resolve) {
    let arrayModifier = [];
    BindAssortmentAndModifier.getModifierByAssortmentId(id).then(res => {
        addElementModifiersInArray(res, arrayModifier);
        getItemModifiersCount(id).then(res => {
            arrayModifier.push(res);
        });

        setTimeout(function () {
            resolve(arrayModifier);
        }, 2000);

    }).catch(err => {
        console.error(err.message);
    })
}

function addElementModifiersInArray(res, arrayModifier) {
    for (let i = 0; i < res.length; i++) {
        Modifier.getModifierDataById(res[i].modifier_id).then(res => {
            arrayModifier.push(res);
        })
    }
}

function getItemModifiersCount(id) {
    return new Promise(resolve => {
        BindAssortmentAndModifier.getItemModifiersCount(id).then(res => {
            resolve(res);
        });
    })
}

exports.categoryChild = function (request, response) {
    const getNameCategory = request.params["name"];
    Menu.getChildCategory(getNameCategory).then(res => {
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
        addCategoryInToArchive(categoryName, nameCategory)
    })
}

function addCategoryInToArchive(categoryName, nameCategory) {
    Assortment.getChildCategoryCount(nameCategory).then(res => {
        let getCountChildCategory = res[0].countValue;
        const archive = new ArchiveCategory(categoryName, getCountChildCategory);
        archive.appendItem();
    })
}

function appendAssortmentInArchiveItem(id, name, response) {
    Assortment.getAllDataAssortmentByName(name).then(res => {
        getAllDataByForeignKey(res, ArchiveItem);
        deleteCategory(id, response);
    }).catch(err => {
        console.error(err.message);
    })
}

function getAllDataByForeignKey(res, value) {
    let assortment;
    for (let assortmentKey in res) {
        assortment = new value(res[assortmentKey].name, res[assortmentKey].price,
            res[assortmentKey].waiting_time, res[assortmentKey].weight, res[assortmentKey].description,
            res[assortmentKey].photo, res[assortmentKey].active, res[assortmentKey].dishes_name);
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

exports.restoreCategory = function (request, response) {
    const nameCategory = request.params["name"];
    restoreCategory(nameCategory, response);
    restoreAssortmentByName(nameCategory);
    ArchiveCategory.deleteCategoryDuringRestore(nameCategory);
    ArchiveItem.deleteItemsCategoryDuringRestore(nameCategory).then(() => {
        response.send("Restore category");
    });
}

exports.deleteCategoryFromArchive = function (request) {
    const nameCategory = request.params["name"];
    ArchiveCategory.deleteCategoryDuringRestore(nameCategory);
}

function restoreCategory(nameCategory) {
    const menu = new Menu(nameCategory, null);
    menu.createCategory().catch(err => {
        console.error(err.message);
    });
}

exports.deleteAssortment = function (request, response) {
    const idAssortment = request.params["id"];
    appendAssortmentArchive(idAssortment);
    deleteAssortment(idAssortment, response);
}

exports.deleteAssortmentFromArchive = function (request, response) {
    const id = request.params["id"];
    deleteAssortment(id, response);
}

function deleteAssortment(idAssortment, response) {
    Assortment.deleteAssortment(idAssortment).then(() => {
        response.send("Delete assortment");
    }).catch(err => {
        console.error(err.message);
    });
}

function appendAssortmentArchive(idAssortment) {
    Assortment.getAllDataAssortmentById(idAssortment).then(res => {
        const archiveItems = new ArchiveItem(res[0].name, res[0].price, res[0].waiting_time, res[0].weight,
            res[0].description, res[0].photo, res[0].active, res[0].dishes_name);
        archiveItems.appendItems();
    });
}

exports.createAssortment = function (request, response) {
    if (!request.body) return response.sendStatus(404);
    const requestBody = request.body;
    const nameCategory = request.params["name"];
    const nameAssortment = requestBody.name;
    const price = requestBody.price;
    const waiting_time = requestBody.waiting_time;
    const weight = requestBody.weight;
    const description = requestBody.description;
    const photo = requestBody.photo;
    let active = requestBody.active;
    const apply_modifiers_id = requestBody.apply_modifiers;

    const setItemArchive = active === 'true';
    active = setBooleanValue(setItemArchive);

    appendAssortmentDuringCreate(nameAssortment, price, waiting_time, weight,
        description, photo, active, nameCategory, response)

    getAssortmentId(nameAssortment, apply_modifiers_id);
}

function appendAssortmentDuringCreate(nameAssortment, price, waiting_time, weight,
                                      description, photo, active, nameCategory, response) {
    if (active) {
        appendArchiveItem(nameAssortment, price, waiting_time, weight,
            description, photo, active, nameCategory);
    } else {
        setValueForCreateAssortment(nameAssortment, price, waiting_time, weight,
            description, photo, active, nameCategory, response);
    }
}

function getAssortmentId(name, id) {
    Assortment.getIdAssortmentByName(name).then(res => {
        for (let val in id) {
            const bindAssortmentAndModifier = new BindAssortmentAndModifier(res[0].id, id[val]);
            bindAssortmentAndModifier.appendItems();
        }
    })
}

function setValueForCreateAssortment(nameAssortment, price, waiting_time, weight,
                                     description, photo, active, nameCategory, response) {

    const assortment = new Assortment(nameAssortment, price, waiting_time, weight,
        description, photo, active, nameCategory);
    assortment.createAssortment().then(() => {
        response.send("Create assortment");
    }).catch(err => {
        console.error(err.message);
    });
}

function restoreAssortmentByName(nameCategory) {
    ArchiveItem.getAllDataArchiveItem(nameCategory).then(res => {
        createAssortment(res);
    }).catch(err => {
        console.error(err.message);
    })
}

function createAssortment(res) {
    let assortment;
    for (let assortmentKey in res) {
        assortment = new Assortment(res[assortmentKey].name, res[assortmentKey].price,
            res[assortmentKey].waiting_time, res[assortmentKey].weight, res[assortmentKey].description,
            res[assortmentKey].photo, res[assortmentKey].active, res[assortmentKey].dishes_name);

        assortment.createAssortment().catch(err => {
            console.error(err.message);
        });
    }
}

exports.editAssortment = function (request, response) {
    const requestBody = request.body;
    if (!requestBody) return response.sendStatus(404)
    const nameCategory = request.params["name"];
    const idAssortment = request.params["id"];
    const nameAssortment = requestBody.name;
    const price = requestBody.price;
    const waiting_time = requestBody.waiting_time;
    const weight = requestBody.weight;
    const description = requestBody.description;
    const photo = requestBody.photo;
    let active = requestBody.active;
    const setItemArchive = active === 'true';

    active = setBooleanValue(setItemArchive, active);

    appendAssortmentDuringEdit(nameAssortment, price, waiting_time, weight,
        description, photo, active, nameCategory, idAssortment, response);
}

function setBooleanValue(setItemArchive) {
    if (setItemArchive) {
        return 1;
    } else {
        return 0;
    }
}

function appendAssortmentDuringEdit(nameAssortment, price, waiting_time, weight,
                                    description, photo, active, nameCategory, idAssortment, response) {
    if (active) {
        appendArchiveItem()
        Assortment.deleteAssortment(idAssortment);
    } else {
        setValueForEditAssortment(nameAssortment, price, waiting_time, weight,
            description, photo, active, idAssortment, response);
    }
}

function appendArchiveItem(nameAssortment, price, waiting_time, weight,
                           description, photo, active, nameCategory) {
    const archiveItems = new ArchiveItem(nameAssortment, price, waiting_time, weight,
        description, photo, active, nameCategory);
    archiveItems.appendItems();
}

function setValueForEditAssortment(nameAssortment, price, waiting_time, weight,
                                   description, photo, active, idAssortment, response) {
    Assortment.editAssortment(nameAssortment, price, waiting_time, weight,
        description, photo, active, idAssortment)
        .then(() => {
            response.send("Edit assortment");
        }).catch(err => {
        console.error(err.message);
    });
}

exports.restoreAssortment = function (request, response) {
    const idAssortment = request.params["id"];
    restoreAssortmentById(idAssortment)
    ArchiveItem.deleteItemById(idAssortment).then(() => {
        response.send("Restore Assortment");
    });
}

function restoreAssortmentById(idAssortment) {
    ArchiveItem.getAllDataArchiveItemById(idAssortment).then(res => {
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

exports.modifierItem = function (request, response) {
    const id = request.params["id"];
    returnModifierItems(id).then(res => {
        response.json(res);
    });
}

function returnModifierItems(id) {
    return new Promise(resolve => {
        getModifierItems(id, resolve)
    })
}

function getModifierItems(id, resolve) {
    let arrayItems = [];
    BindAssortmentAndModifier.getAssortmentByModifierId(id).then(res => {
        addItemsInToArray(res, arrayItems);
        getModifierItemsCount(id).then(res => {
            arrayItems.push(res);
        });

        setTimeout(function () {
            resolve(arrayItems);
        }, 2000);

    }).catch(err => {
        console.error(err.message);
    })
}

function addItemsInToArray(res, arrayItems) {
    for (let i = 0; i < res.length; i++) {
        Assortment.getAllDataAssortmentById(res[i].assortment_id).then(res => {
            arrayItems.push(res);
        })
    }
}

function getModifierItemsCount(id) {
    return new Promise(resolve => {
        BindAssortmentAndModifier.getModifierItemsCount(id).then(res => {
            resolve(res);
        });
    })
}

exports.createModifier = function (request, response) {
    const nameModifier = request.params["name"];
    const price = request.body.price;
    const weight = request.body.weight;
    const archive = request.params["archive"];
    const items_id = request.body.items;
    const setItemArchive = archive === 'true';

    appendItem(setItemArchive, nameModifier, price, weight, response, items_id)
}

function appendItem(setItemArchive, nameModifier, price, weight, response, items_id) {
    if (setItemArchive) {
        createItemInArchiveModifier(nameModifier, price, weight, response);
    } else {
        appendModifier(nameModifier, price, weight, response)
        getModifierId(nameModifier, items_id);
    }
}

function getModifierId(nameModifier, items_id) {
    Modifier.getModifierIdByName(nameModifier).then(res => {
        addModifierIdsInToBindTable(items_id, res)
    })
}

function addModifierIdsInToBindTable(id, res) {
    for (let val in id) {
        const bindAssortmentAndModifier = new BindAssortmentAndModifier(id[val], res[0].id,);
        bindAssortmentAndModifier.appendItems();
    }
}

function appendModifier(nameModifier, price, weight, response) {
    const modifier = new Modifier(nameModifier, price, weight);

    modifier.createModifier().then(() => {
        response.send("Create modifier");
    }).catch(err => {
        console.error(err.message);
    });
}

exports.editModifier = function (request, response) {
    const nameModifier = request.body.name;
    const price = request.body.price;
    const weight = request.body.weight;
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
    BindAssortmentAndModifier.deleteModifier(id);
}

function deleteModifier(id, response) {
    Modifier.deleteModifier(id).then(() => {
        response.send("Delete modifier");
    }).catch(err => {
        console.error(err.message);
    });
}

function appendModifierArchive(id) {
    Modifier.getModifierDataById(id).then(res => {
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

exports.deleteModifierFromArchive = function (request, response) {
    const id = request.params["id"];
    ArchiveModifier.deleteModifier(id).then(() => {
        response.send("Delete modifier");
    }).catch(err => {
        console.error(err.message);
    });
}

function restoreModifier(request, id) {
    ArchiveModifier.getModifierDataById(id).then(res => {
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