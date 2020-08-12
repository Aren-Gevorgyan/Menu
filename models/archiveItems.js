const connectionMysql = require("../utils/db");
let archiveItems = [];

module.exports = class Archive {
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
        archiveItems.push(this.name,
            this.price,
            this.waiting_time,
            this.weight,
            this.apply_modifiers,
            this.description,
            this.photo,
            this.active,
            this.dishes_name);
    }

    appendItems() {
        return new Promise(function (resolve, reject) {
            const sql = "INSERT INTO archiveItems(name, price, waiting_time, weight, apply_modifiers, description, photo, active, dishes_name)\n" +
                " VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?);"
            connectionMysql.query(sql, archiveItems, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
            archiveItems.length = 0;
        })
    }
}
