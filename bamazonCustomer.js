// require appropiate npm installs 
let inq = require("inquirer");
let mysql = require("mysql");
let colors = require("colors")
let itemsAvailable = []

// stablish connection with MySQL
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Doctorwho1963",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});

// after connnection has been stablished run the following function
function afterConnection() {
    connection.query("SELECT * FROM products", function (err, response) {
        if (err) throw err;
        // go through response array and extract and display itme info
        response.forEach(element => {

            itemsAvailable.push(element.product_name)

            console.log("ID: ".brightGreen + element.item_id)
            console.log("product: ".brightGreen + element.product_name)
            console.log("price: ".brightGreen + element.price)
            console.log("stock: ".brightGreen + element.stock_quantity)
            console.log("-------------------------------------")

        });

        customerChoice()
        connection.end();
    });
}

// run an inquirer funtion that allos the user to pick an item and a quantity 
let customerChoice = () => {

    inq.prompt([{
            type: "list",
            message: "What would you like to buy? please select an item!",
            name: "userPick",
            choices: itemsAvailable
        },
        {
            type: "input",
            message: "How much of it would you like to buy?",
            name: "quantity"
        }

    ]).then((answer) => {

        // define an empty vatiable to populate with users pick

        let chosenItem = answer.userPick;
        let quantity = answer.quantity

        // check the array of itemes available and match input to the item in array 
        // response.forEach(item => {
        //     if (item === answer.userPick) {
        //         chosenItem = item
        //     }
        // })

        console.log("item: ".brightBlue + chosenItem)
        console.log("quantity to buy: ".brightBlue + quantity)

        // check if the product is in stock

        // if (quantity < this.stock_quantity) {
        //     console.log("we have it in stock!")
        // } else {
        //     console.log("we don't have this")
        // }


    });

}