const connectionMysql = require("../utils/db");
let menuItem = [];
module.exports = class Menu {

    constructor(name) {
        this.name = name;
        menuItem.push(this.name);
    }

    createCategory() {
        return new Promise(function (resolve, reject) {
            const sql = "INSERT INTO dishes(NAME ) VALUE (?)";
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

    static getChildCategory(name) {
        return new Promise(function (resolve, reject) {
            const sql = "SELECT id, name FROM assortment WHERE dishes_name = ?";
            connectionMysql.query(sql, [name], function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }

    static getCategory(id){
        return new Promise(function (resolve, reject) {
            const sql = "SELECT name FROM dishes WHERE id = ?";
            connectionMysql.query(sql, [id], function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
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

    static deleteCategory(id) {
        return new Promise(function (resolve, reject) {
            const sql = "DELETE FROM dishes WHERE id = ?";
            connectionMysql.query(sql, [id], function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }
}