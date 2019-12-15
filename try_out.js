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
        // display items for sale 
        display(response)

        // connection.end();
    });
}

let display = (response) => {

    response.forEach(element => {

        itemsAvailable.push(element.product_name)

        console.log("ID: ".brightGreen + element.item_id)
        console.log("product: ".brightGreen + element.product_name)
        console.log("price: ".brightGreen + element.price)
        console.log("stock: ".brightGreen + element.stock_quantity)
        console.log("-------------------------------------")

    });
    customerChoice(response)
}

// run an inquirer funtion that allos the user to pick an item and a quantity 
let customerChoice = (response) => {

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

        let chosenItem;
        let quantity = parseInt(answer.quantity)

        // check the array of itemes available and match input to the item in array 
        response.forEach(element => {
            if (element.product_name === answer.userPick) {
                chosenItem = element
            }
        })

        // check if you have enough inventory to fulfill order

        if (quantity < chosenItem.stock_quantity) {
            console.log("we have it in stock!".brightBlue)
            // define logic for definging price 
            totalPrice = (chosenItem.price * quantity)
            // logic to update the stock inventory
            newStock = chosenItem.stock_quantity - quantity
            console.log("updated stock: " + newStock)
            connection.query(
                "update products set ?  where ?",
                [{
                        stock_quantity: newStock
                    },
                    {
                        item_id: chosenItem.item_id
                    }
                ],
                function (error) {
                    if (error) throw error;
                    // inform the customer of their total
                    console.log("thank you for your purchase! ".magenta);
                    console.log("your total is: ".brightGreen +
                        "$".brightGreen + (totalPrice))

                }
            )

        } else {
            console.log("sorry ! we don't have enough of this".red)
            inq.prompt({
                type: "list",
                name: "continueShopping",
                choices: ["Yes", "No"],
                message: "would you like to continue shopping ?"
            }).then((answer) => {
                if (answer.continueShopping === "Yes") {
                    afterConnection()

                } else(
                    console.log("Thanks for stopping by !".magenta)


                )
            })
        }

    });

}