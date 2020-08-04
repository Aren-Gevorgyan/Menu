const mysql2 = require("mysql2");
const connection = mysql2.createConnection({
    host: 'localhost',
    user: "root",
    password: "1996karich",
    database: "menu"
})

module.exports = connection;