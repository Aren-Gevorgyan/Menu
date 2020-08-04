const connectionMysql = require("../utils/db");

module.exports = class Navigation {
    navigationItem = [];
    constructor(name, link) {
        this.name = name;
        this.link = link;
        this.navigationItem.push(this.name);
        this.navigationItem.push(this.link);
    }

    static getNavigationItem() {
        return new Promise(function (resolve, reject) {
            const sql = "SELECT * FROM navigation";
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