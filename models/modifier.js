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
            modifierItem.length = 0;
        })
    }

    static getModifierData() {
        return new Promise(function (resolve, reject) {
            const sql = "SELECT id, name, weight, price FROM modifier";
            connectionMysql.query(sql, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }

    static getModifierDataThroughId(id) {
        return new Promise(function (resolve, reject) {
            const sql = "SELECT id, name, weight, price FROM modifier WHERE id = ?";
            connectionMysql.query(sql, [id],function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }

    static getModifierIdThroughName(name) {
        return new Promise(function (resolve, reject) {
            const sql = "SELECT id FROM modifier WHERE name = ?";
            connectionMysql.query(sql, [name],function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }

    static editModifier(name, weight, price, id){
        return new Promise(function (resolve, reject) {
            const sql = "UPDATE modifier SET name=?, weight=?, price=?  WHERE id=?;"
            connectionMysql.query(sql, [name, weight, price, id], function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }

    static deleteModifier(id) {
        return new Promise(function (resolve, reject) {
            const sql = "DELETE FROM modifier WHERE id = ?";
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