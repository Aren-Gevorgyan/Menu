const connectionMysql = require("../utils/db");
let assortmentItem = [];

module.exports = class Assortment {
    constructor(name, price, waiting_time, weight, apply_modifiers, description, photo, active) {
        this.name = name;
        this.price = price;
        this.waiting_time = waiting_time;
        this.weight = weight;
        this.apply_modifiers = apply_modifiers;
        this.description = description;
        this.photo = photo;
        this.active = active;
        assortmentItem.push(this.name);
        assortmentItem.push(this.price);
        assortmentItem.push(this.waiting_time);
        assortmentItem.push(this.weight);
        assortmentItem.push(this.apply_modifiers);
        assortmentItem.push(this.description);
        assortmentItem.push(this.photo);
        assortmentItem.push(this.active);
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
}