const { clientApplication } = require('./client');

let userClient = new clientApplication();
userClient.submitTxn(
    "wholesaler",
    "agrichannel",
    "Supply-chain",
    "ProductContract",
    "matchTxn",
    "",
    "matchOrder",
    "Product-01",
    "Order-01"
).then(result => {
    console.log(new TextDecoder().decode(result))
    console.log("Assigned to Order")
})
