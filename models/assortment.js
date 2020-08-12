const connectionMysql = require("../utils/db");
let assortmentItem = [];

module.exports = class Assortment {
    constructor(name, price, waiting_time, weight, apply_modifiers, description, photo, active, dishes_name) {
        this.name = name;
        this.price = price;
        this.waiting_time = waiting_time;
        this.weight = weight;
        this.apply_modifiers = apply_modifiers;
        this.description = description;
        this.photo = photo;
        this.active = active;
        this.dishes_name = dishes_name;
        assortmentItem.push(this.name,
            this.price,
            this.waiting_time,
            this.weight,
            this.apply_modifiers,
            this.description,
            this.photo,
            this.active,
            this.dishes_name);
    }

    static deleteAssortment(id) {
        return new Promise(function (resolve, reject) {
            const sql = "DELETE FROM assortment WHERE id = ?";
            connectionMysql.query(sql, [id], function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }

    createAssortment() {
        return new Promise(function (resolve, reject) {
            const sql = "INSERT INTO assortment(name, price, waiting_time, weight, apply_modifiers, description, photo, active, dishes_name)\n" +
                "    VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?);"
            connectionMysql.query(sql, assortmentItem, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
            assortmentItem.length = 0;
        })
    }

    static editAssortment(name, price, waiting, weight, apply_modifiers, description, photo, active, id) {
        return new Promise(function (resolve, reject) {
            const sql = "UPDATE assortment SET name=?, price=?, waiting_time=?, weight=?, apply_modifiers=?, description=?, photo=?, active=? WHERE id=?;"
            connectionMysql.query(sql, [name, price, waiting, weight, apply_modifiers, description, photo, active, id], function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }

    static getCountChildCategory(name) {

        return new Promise(function (resolve, reject) {
            const sql = "SELECT COUNT(*) AS countValue FROM assortment WHERE dishes_name = ?";
            connectionMysql.query(sql, [name], function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }

    static getAllDataAssortment(name) {
        return new Promise(function (resolve, reject) {
            const sql = "SELECT * FROM assortment WHERE dishes_name = ?";
            connectionMysql.query(sql, [name], function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    console.log(result);
                    resolve(result);
                }
            })
        })
    }
}