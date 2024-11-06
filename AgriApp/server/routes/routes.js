    const express = require("express");
    const router = express.Router();
    const { clientApplication } = require("./client");

    router.post("/readproduct", async (req, res) => {
    try {
        const { productId } = req.body;
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
        res.status(500).json({
        success: false,
        message: "Please check the Product ID!",
        data: { error },
        });
    }
    });

    router.post("/createproduct", async (req, res) => {
    try {
        const { productId, type, quantity, harvestDate,origin, producerName } = req.body;

        let ManufacturerClient = new clientApplication();

        const result = await ManufacturerClient.submitTxn(
        "manufacturer",
        "agrichannel",
        "Supply-chain",
        "ProductContract",
        "invokeTxn",
        "",
        "createProduct",
        productId,
        type,
        quantity,
        harvestDate,
        origin,
        producerName,
        
        );

        res.status(201).json({
        success: true,
        message: "Product created successfully!",
        data: { result },
        });
    } catch (error) {
        res.status(500).json({
        success: false,
        message: "Please check the Product ID!",
        data: { error },
        });
    }
    });

    module.exports = router;
