# Amazon-storefront

## Getting Started

The application requires node to run. Installation is as follows:

```Bash
    npm install node
```
In order to change the tables directly, workbench can be used to modify eh .sql file.

### Required Packages

```Bash
    npm init -y
    npm install mysql
    npm install inquirer
```

Mysql will be used as the databse to create the tables and inquirer will be used for the interface in node.

## Files

* bamazonCustomer.js
* bamazonSupervisor.js
* bamazonManager.js
* bamazon.sql

### BamazonCustomer.js

This file shows the table with the following:

* Product ID
* Product Name
* Department Name
* Product Price
* Stock #

There is a query for buying a specific product and the amount of the product one wants to buy.

The interface then processes the order nd shows the final price.

### BamazonManager.js

This file gives the following options:

1. View Products For Sale
2. View Low Inventory
3. Add to Inventory
4. Add New Product

#### View Products For Sale

Displays the same table as **bamazonCustomers.js**.

#### View Low Inventory

Displays all the items with a stock number lesser than 5.

#### Add to Inventory

Will display all current products and allows to increase the stock number by a desired amount.

#### Add New Product

Will ask for the name of the product to be added. Then, it will display all the exisiting departments to add one. **If the item has a new department; this should be added in *bamazonSupervisor.js*.** Then, the price and stock number have to be declared.

### BamazonSupervisor.js

This file has two functions:

1. View Product Sales by Department
2. Create New Department

#### View Product Sales by Department

This function displays the following elements:

* Department ID
* Department Name
* Overhead Cost
* **Sales**
* Profit

All columns, except sales and profit are taken from the department table. The sales column is taken from the products table and grouped by department, while profit is the sales - overhead cost.

#### Create New Department

This function asks for the name of the new department and adds it to the departments table. If no items have the department, it will not be displayed with the **View Product Sales by Department** function.

### Bamazon.sql

This will be the structure for the tables and test queries for the database. 

The tables and the columns are defined as follows:

```MySQLWorkbench
create table products (
    item_id int not null auto_increment,
    product_name varchar (100) not null,
    department_name varchar (50) not null,
    price decimal (10, 2) not null,
    stock_quantity int not null,
    product_sales decimal (10, 2) not null default (0),
    primary key(item_id)
);

create table departments (
	department_id int not null auto_increment,
    department_name varchar(100) not null,
	over_head_costs decimal (10,2) not null,
    primary key(department_id)
);
```

The query for displaying the departments with prices is the following: 

```MySQLWorkbench
select departments.department_id, departments.department_name, departments.over_head_costs, sum(product_sales) as sales
from departments, products
where departments.department_name = products.department_name
group by departments.department_name, departments.over_head_costs, departments.department_id;
```

## Technologies Utilized

* Javascript
* Node.js
* MySQL
* MYSQLWorkbench

### Packages Used

* Inquirer
* MySQL

## Authors

Joaquin Valle Pinto

[Github Link] (https://github.com/JoaquinValle/)
