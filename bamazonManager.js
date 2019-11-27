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
                connection.end()
                break
            case "View Low Inventory":
                displayLow()
                connection.end()
                break
            case "Add to Inventory":
                addInventory()
                break
            case "Add New Product":
                addItem()
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

    var query = "select * from products"
    connection.query(query, (err, res) => {
        for (let i = 0; res.length > i; i++) {
            products[i] = new Product(res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity)
        }
    })

    function Product(name, department, price, stock) {
        this.name = name
        this.department = department
        this.price = price
        this.stock = stock
    }  

    var invArr = []
    var query = "select product_name from products"
    connection.query(query, (err, res) => {
        for (let i = 0; res.length > i; i++) {
            invArr.push(res[i].product_name)
        }      
        inquirer.prompt([
            {
                type: "rawlist",
                name: "item",
                message: "Choose an item to increase inventory number:",
                choices: invArr
            },
            {
                name: "quantity",
                message: "How many would you like to add:"
            }
        ]).then((response) => {
            var id = invArr.indexOf(response.item) + 1
            var newQuantity = products[id - 1].stock + parseInt(response.quantity)
            inventoryUpdate(newQuantity, id)
            connection.end()
        })
    })
}

function inventoryUpdate(quantity, id) {
    var query = connection.query("update products set ? where ?",
        [
          {
            stock_quantity: quantity
        },
        {
            item_id: id
          }
        ]
    )
}

function addItem() {
    inquirer.prompt([
        {
            name: "name",
            message: "Wirte the product name of the item to be added:"
        },
        {
            name: "department",
            message: "Write the department for the new product:"
        },
        {
            name: "price",
            message: "Write the price for the product:"
        },
        {
            name: "quantity",
            message: "Write the stock or quantity for the new product:"
        },
    ]).then((response) => {
        setItem(response.name, response.department, parseFloat(response.price), parseInt(response.quantity))
        //console.log(response.name, response.department, parseFloat(response.price), parseInt(response.quantity))
        connection.end()
    })
}

function setItem(product, department, price, quantity) {
    var query = connection.query("insert into products (product_name, department_name, price, stock_quantity) values(?, ?, ?, ?)",
        [
          {
            product_name: product
          },
          {
            department_name: department
          },
          {
            price: price
          },
          {
            stock_quantity: quantity
          }
        ]
    )
    console.log("New item added.")
}