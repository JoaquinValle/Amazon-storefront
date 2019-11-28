var mysql = require("mysql")
var inquirer = require("inquirer")

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "4omisIpt4",
    database: "bamazon_db",
})

connection.connect((err) => {
    if (err) throw err
    showOptions()
})


function showOptions() {
    inquirer.prompt([
        {
        type: "list",
        name: "option",
        message: "Please choose an operation to do.",
        choices: ["View Product Sales by Department", "Create New Department"]
        }
    ]).then((response) => {
        switch(response.option) {
            case "View Product Sales by Department":
                productSales()
                break
            case "Create New Department":
                newDepartment()
                break
        }
    })
}

function productSales() {
    var query = "select * from departments"
}

function newDepartment() {

}