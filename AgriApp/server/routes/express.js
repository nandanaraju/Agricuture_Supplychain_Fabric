const express = require('express');
const { clientApplication } = require('./client');

const router = express.Router();
const userClient = new clientApplication();

// Create Order
router.post('/createorder', async (req, res) => {
    const { orderId, type, quantity, price, distributerName } = req.body;

    if (!orderId || !type || !quantity || !price || !distributerName) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const transientData = {
            type: Buffer.from(type),
            quantity: Buffer.from(quantity.toString()),
            price: Buffer.from(price.toString()),
            distributerName: Buffer.from(distributerName)
        };

        const result = await userClient.submitTxn(
            "distributer",
            "agrichannel",
            "Supply-chain",
            "OrderContract",
            "privateTxn",
            transientData,
            "createOrder",
            orderId,
        );

        res.status(200).json({ message: 'Order created successfully.', result: new TextDecoder().decode(result) });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Error creating order.', error: error.message });
    }
});

// Read Order
router.get('/readOrder/:orderId', async (req, res) => {
    const { orderId } = req.params;

    try {
        const result = await userClient.submitTxn(
            "wholesaler",
            "agrichannel",
            "Supply-chain",
            "OrderContract",
            "queryTxn",
            "",
            "readOrder",
            orderId
        );

        const decodedResult = new TextDecoder().decode(result);
        res.status(200).json(JSON.parse(decodedResult));
    } catch (error) {
        console.error('Error reading order:', error);
        res.status(500).json({ message: `Error reading order ${orderId}.`, error: error.message });
    }
});

// Delete Order
router.delete('/deleteOrder/:orderId', async (req, res) => {
    const { orderId } = req.params;

    try {
        await userClient.submitTxn(
            "distributer",
            "agrichannel",
            "Supply-chain",
            "OrderContract",
            "queryTxn",
            "",
            "deleteOrder",
            orderId
        );

        res.status(200).json({ message: `Order ${orderId} deleted successfully.` });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ message: `Error deleting order ${orderId}.`, error: error.message });
    }
});

module.exports = router;
