// require appropiate npm installs 
let inq = require("inquirer");
let mysql = require("mysql");
let colors = require("colors")
let itemsAvailable = []

let quantity = 0
let item = ""

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

function afterConnection() {
    connection.query("SELECT * FROM products", function (err, response) {
        if (err) throw err;
        response.forEach(element => {

            itemsAvailable.push(element.product_name)

            console.log("product id: ".brightGreen + element.item_id)
            console.log("product: ".brightGreen + element.product_name)
            console.log("price: ".brightGreen + element.price)
            console.log("stock: ".brightGreen + element.stock_quantity)
            console.log("-------------------------------------")

        });
        customerChoice()
        connection.end();
    });
}


let customerChoice = () => {

    inq.prompt([{
            type: "list",
            message: "What would you like to buy? please select an item!",
            name: "item",
            choices: itemsAvailable
        },
        {
            type: "input",
            message: "How much of it would you like to buy?",
            name: "quantity"
        }

    ]).then((input) => {

        item = input.item
        quantity = input.quantity

        console.log("item: ".brightBlue + item)
        console.log("quantity to buy: ".brightBlue + quantity)

        console.log(quantity)
        console.log(item)
    })

}