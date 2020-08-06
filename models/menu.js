const connectionMysql = require("../utils/db");
let menuItem = [];
module.exports = class Menu {

    constructor(name) {
        this.name = name;
        menuItem.push(this.name);
    }

    static getMenuDishes() {
        return new Promise(function (resolve, reject) {
            const sql = "SELECT id, name FROM dishes ORDER BY id, name DESC";
            connectionMysql.query(sql, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }

    static getMenuCategory(id) {
        return new Promise(function (resolve, reject) {
            const sql = "SELECT id, name FROM assortment WHERE assortment_id = ?";
            connectionMysql.query(sql, [id], function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }

    createCategory() {
        return new Promise(function (resolve, reject) {
            const sql = "INSERT INTO dishes(NAME, ASSORTMENT_ID) VALUE (?,?)";
            connectionMysql.query(sql, menuItem, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
            menuItem.length = 0;
        })
    }

    static editCategory(name, id) {
        return new Promise(function (resolve, reject) {
            const sql = "UPDATE dishes SET name = ? WHERE id = ?";
            connectionMysql.query(sql, [name, id], function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }

    static deleteCategory(name) {
        return new Promise(function (resolve, reject) {
            const sql = "DELETE FROM dishes WHERE name = ?";
            connectionMysql.query(sql, [name], function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }
}