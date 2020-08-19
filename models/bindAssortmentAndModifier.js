const connectionMysql = require("../utils/db");
let assortmentAndModifierItem = [];

module.exports = class BindAssortmentAndModifier {
    constructor(assortment_id, modifier_id) {
        this.assortment_id = assortment_id;
        this.modifier_id = modifier_id;
        assortmentAndModifierItem.push(this.assortment_id, this.modifier_id);
    }

    appendItems() {
            const sql = "INSERT INTO bindAssortmentAndModifier( assortment_id, modifier_id ) VALUE (?, ?);"
            connectionMysql.query(sql, assortmentAndModifierItem, function (err) {
                if (err) {
                    console.error(err.message);
                }
            })
            assortmentAndModifierItem.length = 0;
    }

    static getModifierThroughAssortmentId(id){
        return new Promise(function (resolve, reject) {
            const sql = "SELECT modifier_id FROM bindassortmentandmodifier WHERE assortment_id = ?";
            connectionMysql.query(sql, [id], function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }

    static getCountModifierOwnedByItem(id){
        return new Promise(function (resolve, reject) {
            const sql = "SELECT COUNT(modifier_id ) AS modifierCount FROM bindassortmentandmodifier WHERE assortment_id = ?";
            connectionMysql.query(sql, [id], function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }

    static getAssortmentThroughModifierId(id){
        return new Promise(function (resolve, reject) {
            const sql = "SELECT assortment_id  FROM bindassortmentandmodifier WHERE modifier_id = ?";
            connectionMysql.query(sql, [id], function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }

    static getCountItemOwnedByModifier(id){
        return new Promise(function (resolve, reject) {
            const sql = "SELECT COUNT(assortment_id) AS assortmentCount FROM bindassortmentandmodifier WHERE modifier_id = ?";
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