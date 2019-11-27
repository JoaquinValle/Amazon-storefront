var mysql = require("mysql")
var inquirer = require("inquirer")

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "4omisIpt4",
    database: "bamazon_db",
})

var products = {}

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
        choices: ["View Products For Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ]).then((response) => {
        switch(response.option) {
            case "View Products For Sale":
                display()
                break
            case "View Low Inventory":
                displayLow()
                break
            case "Add to Inventory":
                addInventory()
                break
        }
    })
}

function display() {
    var query = "select * from products"
    connection.query(query, (err, res) => {
        for (let i = 0; res.length > i; i++) {
            products[i] = new Product(res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity)
        }
        console.table(products)
    })

    function Product(name, department, price, stock) {
        this.name = name
        this.department = department
        this.price = price
        this.stock = stock
    }  
}

function displayLow() {
    var query = "select * from products where stock_quantity < 5"
    connection.query(query, (err, res) => {
        for (let i = 0; res.length > i; i++) {
            products[i] = new Product(res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity)
        }
        console.table(products)
    })

    function Product(name, department, price, stock) {
        this.name = name
        this.department = department
        this.price = price
        this.stock = stock
    }  
}

function addInventory() {
    var invArr = []
    var query = "select product_name from products"
    connection.query(query, (err, res) => {
        for (let i = 0; res.length > i; i++) {
            invArr.push(res[i].product_name)
        }
        console.log(invArr)
      
        inquirer.prompt([
            {
            type: "list",
            name: "item",
            message: "Choose an item to increase inventory number.",
            choices: invArr
            },
            {
            name: "amount",
            message: "How many would you like to add?"
            }
        ]).then((response) => {
        })
    })
}