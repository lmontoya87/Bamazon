create database if not exists bamazon_db;

use bamazon_db;

CREATE TABLE products (
	item_id INTEGER(50) AUTO_INCREMENT NOT NULL, 
	product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL, 
    price INTEGER(6),
    stock_quantity INTEGER(100),
    PRIMARY KEY (item_id)
);

SELECT * FROM products;