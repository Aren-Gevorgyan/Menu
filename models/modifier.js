const connectionMysql = require("../utils/db");
let modifierItem = [];

module.exports = class Modifier {
    constructor(name, weight, price) {
        this.name = name;
        this.weight = weight;
        this.price = price;
        modifierItem.push(this.name, this.weight, this.price);
    }
}