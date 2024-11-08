const { clientApplication } = require('./client')

let userClient = new clientApplication()
userClient.submitTxn(
    "manufacturer",
    "agrichannel",
    "Supply-chain",
    "ProductContract",
    "queryTxn",
    "",
    "queryAllProducts"
).then(result => {
            // Decode the Uint8Array to a string
            const decodedString = new TextDecoder().decode(result);
    
            // Parse the string as JSON
            const jsonObject = JSON.parse(decodedString);
            
            console.log("Product details: ")
            // Log the JSON object
            console.log(jsonObject);
});

