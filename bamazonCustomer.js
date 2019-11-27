var mysql = require("mysql")
var inquirer = require("inquirer")


var connection = mysql.createConnection({
    host: "localhost",
    port: 3000,
    user: "root",
    password: "4omisIpt4",
    database: "bamazon_db"
})