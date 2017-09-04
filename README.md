# Bamazon - An Amazon-like storefront with the MySQL. The app takes in orders from customers and depletes stock from the store's inventory. Used the MySQL and Inquirer npm packages for data input and storage.

PLEASE REFER TO THE SCREENSHOTS FOLDER.

Customer View - displays all of the items available for sale. Then prompt users with two messages: The ID of the product they would like to buy. How many units of the product they would like to buy.

Once the customer has placed the order, the application checks if the store has enough of the product to meet the customer's request.
If not, the app will log a phrase like "Insufficient quantity!" and prevent the order from going through. Otherwise, the order will be fulfilled and will log the total cost of the order. Additionally, the database will update to reflect the remaining quantity.

Manager View - displays a menu of the following options: View Products for Sale, View Low Inventory, Add to Inventory
