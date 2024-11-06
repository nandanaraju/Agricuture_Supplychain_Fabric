const { clientApplication } = require('./client')

let userClient = new clientApplication();

const transientData = {
    type: Buffer.from("Paddy"),
    quantity: Buffer.from("10"),
    price: Buffer.from("1000"),
    distributerName: Buffer.from("Distributer1")
}

userClient.submitTxn(
    "wholesaler",
    "agrichannel",
    "Supply-chain",
    "OrderContract",
    "privateTxn",
    transientData,
    "createOrder",
    "Order-01",
).then(result => {
    console.log(new TextDecoder().decode(result))
    console.log("Order successfully created")
})