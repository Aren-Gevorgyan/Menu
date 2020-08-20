const connectionMysql = require("../utils/db");
let archiveCategory = [];

module.exports = class Archive {
    constructor(name, number_item) {
        this.name = name;
        this.number_item = number_item;
        archiveCategory.push(this.name, this.number_item);
    }

    appendItem() {
            const sql = "INSERT INTO archivecategory(name, number_item) VALUE (?,?)";
            connectionMysql.query(sql, archiveCategory, function (err) {
                if (err) {
                    console.error(err.message);
                }
            })
            archiveCategory.length = 0;
    }

    static deleteCategoryDuringRestore(name) {
            const sql = "DELETE FROM archiveCategory WHERE name = ?";
            connectionMysql.query(sql, [name], function (err) {
                if (err) {
                    console.error(err.message);
                }
            })
    }
}
