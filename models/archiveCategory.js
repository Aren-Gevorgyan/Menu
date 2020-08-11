const connectionMysql = require("../utils/db");
let archiveCategory = [];

module.exports = class Archive {
    constructor(name, number_item) {
        this.name = name;
        this.number_item = number_item;
        archiveCategory.push(this.name, this.number_item);
    }

    appendItem() {
        return new Promise(function (resolve, reject) {
            const sql = "INSERT INTO archivecategory(name, number_item) VALUE (?,?)";
            connectionMysql.query(sql, archiveCategory, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
            archiveCategory.length = 0;
        })
    }
}
