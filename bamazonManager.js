var inquirer = require('inquirer');
var mysql = require('mysql');
var columnify = require('columnify');

var prompt = inquirer.createPromptModule();

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "root",
    database: "bamazon_db"

});

connection.connect(function(err) {
  if (err) throw err;
//   console.log("connected as id " + connection.threadId);
  makeSelection();
});

var makeSelection = function() {
  inquirer.prompt({
    name: "action",
    type: "rawlist",
    message: "What would you like to do?",
    choices: [
      "View Products for Sale",
      "View Low Inventory",
      "Add to Inventory",
      "Add New Product"
    ]
  }).then(function(answer) {
      
    switch (answer.action) {
      case "View Products for Sale":
        productList();
        break;

      case "View Low Inventory":
        lowInventory();
        break;

      case "Add to Inventory":
        addInventory();
        break;

      case "Add New Product":
        addProduct();
        break;

    }
  });
};

function productList(res) {
//   Run through products list and display in columns for easy reading //
connection.query("SELECT * FROM products", function(err, res) {
    var column = columnify(res, {
        config: {
            id: {minWidth: 10},
            product_name: {minWidth: 15},
            department_name: {minWidth: 20},
            price: {minWidth: 10},
            stock_quantity: {midWidth: 10}
        }
    })
console.log(column);   
});    
}

function lowInventory(res) {
//   Run through products list and provides list of inventory that has less than 5 in stock(quantity) //
connection.query("SELECT * FROM products GROUP BY product_name HAVING max(stock_quantity) < 5", function(err, res) {
    if (res == "") {
    console.log("There is no low inventory right now");
    }
    else {
    var column = columnify(res, {
        config: {
            id: {minWidth: 10},
            product_name: {minWidth: 15},
            department_name: {minWidth: 20},
            price: {minWidth: 10},
            stock_quantity: {midWidth: 10}
        }
    })
    }
   console.log(column);  
});
}

function addInventory(res) {
    // Adds inventory to the database through Manager inputs //
    inquirer.prompt([
        {
            type: "input",
            name: "item",
            message: "What is the product ID# you want to add more inventory to?"
        },
        {
            type: "input",
            name: "units",
            message: "How many units of inventory do you want to add?"
        }
    ]).then(function(choices) {   

        connection.query("UPDATE products SET ? +stock_quantity WHERE ?", [{
                stock_quantity: choices.units
        },
        {
                item_id: choices.item
        }],  function(err, res) {}); 
         console.log("The inventory has been updated!");  
    });
}
