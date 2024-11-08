const { clientApplication } = require('./client');

let userClient = new clientApplication();
userClient.submitTxn(
    "manufacturer",
    "agrichannel",
    "Supply-chain",
    "ProductContract",
    "dltTxn",
    "",
    "deleteProduct",
    "Product-01"
).then(result => {
    console.log(new TextDecoder().decode(result))
})
