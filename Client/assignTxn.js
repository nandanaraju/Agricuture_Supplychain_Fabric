const { clientApplication } = require('./client');

let userClient = new clientApplication();
userClient.submitTxn(
    "distributer",
    "agrichannel",
    "Supply-chain",
    "ProductContract",
    "assignTxn",
    "",
    "assignProductToMarket",
    "Product-01",
    "Alice",
    "Market1"
).then(result => {
    console.log(new TextDecoder().decode(result))
})
