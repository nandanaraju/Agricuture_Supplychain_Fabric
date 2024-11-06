const { clientApplication } = require('./client');

let userClient = new clientApplication();
userClient.submitTxn(
    "manufacturer",
    "agrichannel",
    "Supply-chain",
    "ProductContract",
    "assignTxn",
    "",
    "completeProductSaleAtMarket",
    "Product-01",
    "500"
).then(result => {
    console.log(new TextDecoder().decode(result))
})
