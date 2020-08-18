const connectionMysql = require("../utils/db");
let assortmentAndModifierItem = [];

module.exports = class BindAssortmentAndModifier {
    constructor(assortment_id, modifier_id) {
        this.assortment_id = assortment_id;
        this.modifier_id = modifier_id;
        assortmentAndModifierItem.push(this.assortment_id, this.modifier_id);
    }

    appendItems() {
        return new Promise(function (resolve, reject) {
            const sql = "INSERT INTO bindAssortmentAndModifier( assortment_id, modifier_id ) VALUE (?, ?);"
            connectionMysql.query(sql, assortmentAndModifierItem, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
            assortmentAndModifierItem.length = 0;
        })
    }
}