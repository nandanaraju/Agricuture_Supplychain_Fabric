const { clientApplication } = require('./client');

let userClient = new clientApplication();
userClient.submitTxn(
    "manufacturer",
    "agrichannel",
    "Supply-chain",
    "ProductContract",
    "transTxn",
    "",
    "transferToWholesaler",
    "Product-01",
    "Wholesaler1"
).then(result => {
    console.log(new TextDecoder().decode(result))
    console.log("Transferred to Wholesaler")
})
