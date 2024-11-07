    const express = require("express");
    const router = express.Router();
    const { clientApplication } = require("./client");

    router.post("/readproduct", async (req, res) => {
        try {
            const { productId } = req.body;
            if (!productId) {
                return res.status(400).json({
                    success: false,
                    message: "Product ID is required",
                });
            }
    
            let manufacturerClient = new clientApplication();
            let products = await manufacturerClient.submitTxn(
                "manufacturer",
                "agrichannel",
                "Supply-chain",
                "ProductContract",
                "queryTxn",
                "",
                "readProduct",
                productId
            );
    
            const data = new TextDecoder().decode(products);
            const value = JSON.parse(data);
    
            res.status(200).json({
                success: true,
                message: "Product data read successfully!",
                data: { value },
            });
        } catch (error) {
            console.error("Error reading product:", error);
            res.status(500).json({
                success: false,
                message: "Please check the Product ID!",
                data: { error: error.message },
            });
        }
    });
    
    router.post("/createproduct", async (req, res) => {
        try {
            const { productId, type, quantity, harvestDate, origin, producerName } = req.body;
    
            if (!productId || !type || !quantity || !harvestDate || !origin || !producerName) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required",
                });
            }
    
            let manufacturerClient = new clientApplication();
    
            const result = await manufacturerClient.submitTxn(
                "manufacturer",
                "agrichannel",
                "Supply-chain",
                "ProductContract",
                "invokeTxn",
                "",
                "createProduct",
                productId,
                type,
                quantity.toString(), // Ensure correct type
                harvestDate.toString(), // Ensure correct type
                origin,
                producerName
            );
    
            res.status(201).json({
                success: true,
                message: "Product created successfully!",
                data: { result },
            });
        } catch (error) {
            console.error("Error creating product:", error);
            res.status(500).json({
                success: false,
                message: "Please check the Product ID!",
                data: { error: error.message },
            });
        }
    });
    

    module.exports = router;
