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
    display()
})

function display() {
    var query = "select * from products"
    connection.query(query, (err, res) => {
        var products = {}
        for (let i = 0; res.length > i; i++) {
            //console.log(res[i].product_name)
            products[i] = new Product(res[i].product_name, res[i].department_name, "$" + res[i].price, res[i].stock_quantity)
        }
        console.table(products)
    })
}

function Product(name, department, price, stock) {
    this.Name = name
    this.Department = department
    this.Price = price
    this.Stock = stock
}