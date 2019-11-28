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
products = {}

function productSales() {
    var query = "select departments.department_name, departments.over_head_costs, sum(product_sales) as sales " 
    query += "from departments, products where departments.department_name = products.department_name "
    query += "group by departments.department_name, departments.over_head_costs"
    connection.query(query, (err, res) => {
        for (let i = 0; res.length > i; i++) {
            products[i] = new Product(res[i].department_name, res[i].over_head_costs, res[i].sales)
        }
        console.table(products)
        //console.log(res)
    })

    function Product(department, overhead, sales) {
        this.department = department
        this.overhead = overhead
        this.sales = sales
    }  
}

function newDepartment() {

}