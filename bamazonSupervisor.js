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
                addDepartment()
                break
        }
    })
}
departments = {}

function productSales() {
    var query = "select departments.department_id, departments.department_name, departments.over_head_costs, sum(product_sales) as sales " 
    query += "from departments, products where departments.department_name = products.department_name "
    query += "group by departments.department_name, departments.over_head_costs, departments.department_id"
    connection.query(query, (err, res) => {
        for (let i = 0; res.length > i; i++) {
            var profit = res[i].sales - res[i].over_head_costs
            departments[res[i].department_id] = new Department(res[i].department_name, res[i].over_head_costs, res[i].sales, parseInt(profit.toFixed(2)))
        }
        console.table(departments)
        connection.end()
    })

    function Department(department, overhead, sales, profit) {
        this.department = department
        this.overhead = overhead
        this.sales = sales
        this.profit = profit
    }  
}

function addDepartment() {
    inquirer.prompt([
        {
            name: "name",
            message: "Please add the name of the department: "
        },
        {
            name: "ohCost",
            message: "Please add the overhead cost for the department: "
        }
    ]).then((response) => {
        newDepartment(response.name, response.ohCost)
        console.log("New department added successfully.")
        connection.end()
    })
}

function newDepartment(department, ohCost) {
    var query = connection.query("insert into departments set ?",
        {
            department_name: department,
            over_head_costs: ohCost,
        }
    )
}