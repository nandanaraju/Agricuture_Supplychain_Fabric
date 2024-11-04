const { clientApplication } = require('./client');

let userClient = new clientApplication();
userClient.submitTxn(
    "manufacturer",
    "agrichannel",
    "Supply-chain",
    "ProductContract",
    "invokeTxn",
    "",
    "createProduct",
    "Product-01",
    "Paddy",
    "10",
    "12/10/2024",
    "Kerala",
    "Manufacturer1"
).then(result => {
    console.log(new TextDecoder().decode(result))
    console.log("Product successfully created")
})
