const connectionMysql = require("../utils/db");
let modifierItem = [];

module.exports = class Modifier {
    constructor(name, weight, price) {
        this.name = name;
        this.weight = weight;
        this.price = price;
        modifierItem.push(this.name, this.weight, this.price);
    }

    createModifier() {
        return new Promise(function (resolve, reject) {
            const sql = "INSERT INTO modifier(name, weight, price) VALUE (?, ?, ?);"
            connectionMysql.query(sql, modifierItem, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }

    static getModifierData() {
        return new Promise(function (resolve, reject) {
            const sql = "SELECT id, name FROM modifier";
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