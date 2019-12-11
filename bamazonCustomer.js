// require appropiate npm installs 
let inquirer = require("inquirer");
let mysql = require("mysql");

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

            // console.log(element.RowDataPacket.item_id)
        });
        // console.log(response);
        connection.end();
    });
}