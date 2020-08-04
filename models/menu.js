const connectionMysql = require("../utils/db");

module.exports = class Menu {
    menuItem = [];

    constructor(name, assortment_id) {
        this.name = name;
        this.assortment_id = assortment_id;
        this.menuItem.push(this.name);
        this.menuItem.push(this.assortment_id);
    }

    static getMenuDishes() {
        return new Promise(function (resolve, reject) {
            const sql = "SELECT name FROM dishes WHERE assortment_id = NULL";
            connectionMysql.query(sql, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }
}