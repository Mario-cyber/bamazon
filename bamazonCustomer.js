// require appropiate npm installs 
let inq = require("inquirer");
let mysql = require("mysql");
let colors = require("colors")

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

            console.log("element id: " + element.item_id)
            console.log("product: " + element.product_name)
            console.log("price: " + element.price)
            console.log("stock: " + element.stock_quantity)
            console.log("-------------------------------------")

        });
        customerChoice()
        // console.log(response);
        connection.end();
    });
}

let customerChoice = () => {

    inq.prompt([{
            type: "input",
            message: "What would you like to buy? (please provide its ID)",
            name: "item"
        },
        {
            type: "input",
            message: "How much of it would you like to buy?",
            name: "quantity"
        }

    ]).then((input) => {

        let item = input.item
        let quantity = input.quantity

        console.log(item)
        console.log(quantity)


    })

}