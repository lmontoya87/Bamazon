use bamazon_db;

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES("laptop", "computers", 100, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES("mouse pad", "computer accessories", 5, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES("wireless mouse", "computer accessories", 10, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES("tablet", "computers", 200, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES("jacket", "clothing", 70, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES("pants", "clothing", 50, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES("top", "clothing", 20, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES("skirt", "clothing", 10, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES("sports top", "active wear", 30, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES("yoga pants", "active wear", 20, 50);

UPDATE products 
SET 
    price = 200, 
    stock_quantity = 10 
WHERE product_name = "laptop";


SELECT * FROM products;