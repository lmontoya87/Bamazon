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

//Test connection//
connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
});

//Run through products list//
connection.query("SELECT item_id, product_name, price FROM products", function(err, res) {
    if (err) throw err;
    var column = columnify(res, {
        config: {
            id: {minWidth: 5},
            product_name: {minWidth: 15},
            price: {minWidth: 10}
        }
    })
console.log(column);    
createPurchase(res);
});

function createPurchase(res) {   
    inquirer.prompt([
        {
            type: "input",
            name: "item",
            message: "What is the ID# of the product you want to purchase?"
        },
    {
            type: "input",
            name: "units",
            message: "How many units do you want to purchase?"
        }
    ]).then(function(choice) {   
        connection.query("SELECT * from products", function(err, res) {      
        var id = choice.item; //id number the customer selected
        var itemID = id - 1; //to match user choice with db item id
        var qty = choice.units; //number of units the customer selected
        var availQty = res[itemID].stock_quantity;
            if (qty > availQty) {
                console.log("Sorry, not enough stock on hand to fill your purchase!")
            }
            else {
                console.log("Thank you for your purchase!");
                var newQty = availQty - qty; 

                connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: newQty
                }, {
                    item_id: id
                }], function(err, res) {});

                connection.query("SELECT * FROM products", function(err, res) {
                    var itemTotal = res[itemID].price * qty;
                    console.log("Your total purchase price today is $" + itemTotal);                  
                });
            }
    });
    });
}   
