const connectionMysql = require("../utils/db");
let assortmentItem = [];

module.exports = class Assortment {
    constructor(name, price, waiting_time, weight, apply_modifiers, description, photo, active, assortment_id) {
        this.name = name;
        this.price = price;
        this.waiting_time = waiting_time;
        this.weight = weight;
        this.apply_modifiers = apply_modifiers;
        this.description = description;
        this.photo = photo;
        this.active = active;
        this.assortment_id = assortment_id;
        assortmentItem.push(this.name,
            this.price,
            this.waiting_time,
            this.weight,
            this.apply_modifiers,
            this.description,
            this.photo,
            this.active,
            this.assortment_id);
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

//new
    createAssortment() {
        return new Promise(function (resolve, reject) {
            const sql = "INSERT INTO assortment(name, price, waiting_time, weight, apply_modifiers, description, photo, active, assortment_id)\n" +
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

//new
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
}