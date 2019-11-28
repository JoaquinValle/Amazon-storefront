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
    customerAction()
})

var products = {}

function display() {
    var query = "select * from products"
    connection.query(query, (err, res) => {
        for (let i = 0; res.length > i; i++) {
            products[res[i].item_id] = new Product(res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity)
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

 function initial() {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "Would you like to buy an item?",
            choices: ["Yes", "No"]
        }
    ]).then((answer) => {
        if (answer.choice === "Yes") {
            customerAction()
        }
        else {
            connection.end()
        }
    })
 }

function customerAction() {
    inquirer.prompt([
        {
            name: "id",
            message: "Enter id of the item you want to buy:"
        },
        {
            name: "quantity",
            message: "Enter how many units of the product you want to buy:"   
        }
    ]).then((response) => {
        if (products[response.id].stock >= response.quantity) {
            var newQuantity = products[response.id].stock - response.quantity
            var id = parseInt(response.id)
            var total = products[response.id].price * response.quantity
            console.log("Order is processing...")
            customerBuy(newQuantity, id, total)
            console.log(`Your total is $${total}`)
        }
        else {
            console.log("Insufficient quantity!")
        }
        connection.end();
    })
}

function customerBuy(quantity, id, sales) {
    var query = connection.query("update products set ? where ?",
        [
          {
            stock_quantity: quantity,
            product_sales: sales
        },
        {
            item_id: id
          }
        ]
    )
}