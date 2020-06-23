const invoices = require("./data/invoices.json");
const plays = require("./data/plays.json");
const calcOrder = require("./src/calc-order.js");

console.log(calcOrder(invoices[0], plays));
