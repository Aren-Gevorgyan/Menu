const connectionMysql = require("../utils/db");
let archiveModifier = [];

module.exports = class ArchiveModifier {
    constructor(name, weight, price) {
        this.name = name;
        this.weight = weight;
        this.price = price;
        archiveModifier.push(this.name, this.weight, this.price, this.archive);
    }

    createItemInArchiveModifier() {
        return new Promise(function (resolve, reject) {
            const sql = "INSERT INTO archiveModifier(name, weight, price)\n" +
                " VALUE (?, ?, ?);"
            connectionMysql.query(sql, archiveModifier, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
            archiveModifier.length = 0;
        })
    }

    static deleteModifier(id) {
        return new Promise(function (resolve, reject) {
            const sql = "DELETE FROM archivemodifier WHERE id = ?";
            connectionMysql.query(sql, [id], function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }

    static getModifierDataById(id) {
        return new Promise(function (resolve, reject) {
            const sql = "SELECT id, name, weight, price FROM archivemodifier WHERE id = ?";
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