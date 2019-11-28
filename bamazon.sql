drop database if exists bamazon_db;

create database bamazon_db;

use bamazon_db;

create table products (
	item_id int not null auto_increment,
    product_name varchar (100) not null,
    department_name varchar (50) not null,
    price decimal (10, 2) not null,
    stock_quantity int not null,
    product_sales decimal (10, 2) not null default (0),
    primary key(item_id)
);

insert into products (product_name, department_name, price, stock_quantity)
values ("Headphones", "Electronics", 149, 23);

insert into products (product_name, department_name, price, stock_quantity)
values ("Catan", "Board Games", 44.50 , 12);

insert into products (product_name, department_name, price, stock_quantity)
values ("Rice Cooker", "Cooking", 19.99, 33);

insert into products (product_name, department_name, price, stock_quantity)
values ("White Polo", "Clothes", 39.99, 6);

insert into products (product_name, department_name, price, stock_quantity)
values ("Auxiliary Cord", "Electronics", 6.50, 44);

insert into products (product_name, department_name, price, stock_quantity)
values ("The Lincoln Lawyer", "Books", 19.79, 16);

insert into products (product_name, department_name, price, stock_quantity)
values ("Twin Size Bedsheets", "Home", 49.99, 9);

insert into products (product_name, department_name, price, stock_quantity)
values ("Before the Fall (Hardcover)" , "Books", 39.99, 36);

insert into products (product_name, department_name, price, stock_quantity)
values ("Popcorn Machine", "Cooking", 42.18, 3);

insert into products (product_name, department_name, price, stock_quantity)
values ("Baseball Bat", "Sports", 22, 11);

create table departments (
	department_id int not null auto_increment,
    department_name varchar(100) not null,
	over_head_costs decimal (10,2) not null,
    primary key(department_id)
);

insert into departments (department_name, over_head_costs)
values ("Electronics", 520);

insert into departments (department_name, over_head_costs)
values ("Board Games", 650);

insert into departments (department_name, over_head_costs)
values ("Cooking", 750);

insert into departments (department_name, over_head_costs)
values ("Clothes", 1100);

insert into departments (department_name, over_head_costs)
values ("Books", 275);

insert into departments (department_name, over_head_costs)
values ("Home", 920);

insert into departments (department_name, over_head_costs)
values ("Sports", 325);

select * from products;
select * from departments;

select department_name, sum(product_sales) from products group by department_name;

select departments.department_name, departments.over_head_costs, sum(product_sales) 
from departments, products
where departments.department_name = products.department_name
group by departments.department_name, departments.over_head_costs;

SHOW VARIABLES LIKE 'sql_mode';
SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

delete from products where product_name = "0";

update products set stock_quantity = 23 where item_id = 1;
