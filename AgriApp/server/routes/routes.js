const express = require("express");
const { clientApplication } = require("./client");

const router = express.Router();
const userClient = new clientApplication();

// Create Order
router.post("/createorder", async (req, res) => {
  const { orderId, type, quantity, price, distributerName } = req.body;

  if (!orderId || !type || !quantity || !price || !distributerName) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const transientData = {
      type: Buffer.from(type),
      quantity: Buffer.from(quantity.toString()),
      price: Buffer.from(price.toString()),
      distributerName: Buffer.from(distributerName),
    };

    const result = await userClient.submitTxn(
      "distributer",
      "agrichannel",
      "Supply-chain",
      "OrderContract",
      "privateTxn",
      transientData,
      "createOrder",
      orderId
    );

    res
      .status(200)
      .json({
        message: "Order created successfully.",
        result: new TextDecoder().decode(result),
      });
  } catch (error) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ message: "Error creating order.", error: error.message });
  }
});

// Read Order
router.get("/readOrder/:orderId", async (req, res) => {
  const { orderId } = req.params;

  try {
    const result = await userClient.submitTxn(
      "distributer",
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
    console.error("Error reading order:", error);
    res
      .status(500)
      .json({
        message: `Error reading order ${orderId}.`,
        error: error.message,
      });
  }
});

// Delete Order
router.delete("/deleteOrder/:orderId", async (req, res) => {
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
    console.error("Error deleting order:", error);
    res
      .status(500)
      .json({
        message: `Error deleting order ${orderId}.`,
        error: error.message,
      });
  }
});

// Read Product
router.post("/readproduct", async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required." });
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

    res
      .status(200)
      .json({
        success: true,
        message: "Product data read successfully!",
        data: { value },
      });
  } catch (error) {
    console.error("Error reading product:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Please check the Product ID!",
        data: { error: error.message },
      });
  }
});

// Create Product
router.post("/createproduct", async (req, res) => {
  try {
    const { productId, type, quantity, harvestDate, origin, producerName } =
      req.body;

    if (
      !productId ||
      !type ||
      !quantity ||
      !harvestDate ||
      !origin ||
      !producerName
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
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
      quantity.toString(),
      harvestDate.toString(),
      origin,
      producerName
    );

    res
      .status(201)
      .json({
        success: true,
        message: "Product created successfully!",
        data: { result },
      });
  } catch (error) {
    console.error("Error creating product:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error creating product!",
        data: { error: error.message },
      });
  }
});

// Delete Product
router.delete("/deleteproduct", async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required." });
    }

    let manufacturerClient = new clientApplication();

    const result = await manufacturerClient.submitTxn(
      "manufacturer",
      "agrichannel",
      "Supply-chain",
      "ProductContract",
      "dltTxn",
      "",
      "deleteProduct",
      productId
    );

    res
      .status(200)
      .json({
        success: true,
        message: "Product deleted successfully!",
        data: { result },
      });
  } catch (error) {
    console.error("Error deleting product:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error deleting product.",
        data: { error: error.message },
      });
  }
});

router.post("/queryAllProducts", async (req, res) => {
  try {
    let product = await userClient.submitTxn(
      "manufacturer",
      "agrichannel",
      "Supply-chain",
      "ProductContract",
      "queryTxn",
      "",
      "queryAllProducts"
    );
    const data = new TextDecoder().decode(product);
    const value = JSON.parse(data);

    res.status(200).json({
      success: true,
      message: "data query successfully!",
      data: { value },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Please check the ID!",
      data: { error },
    });
  }
});

// Transfer Product to distributer
router.post("/transferTodistributer", async (req, res) => {
  const { productId, distributerName } = req.body;

  if (!productId || !distributerName) {
    return res
      .status(400)
      .json({ message: "Product ID and distributer Name are required." });
  }

  try {
    const result = await userClient.submitTxn(
      "manufacturer", // Manufacturer organization
      "agrichannel", // Channel name
      "Supply-chain", // Chaincode name
      "ProductContract", // Smart contract name
      "transTxn", // Transaction type
      "", // No transient data
      "transferTodistributer", // Function name in chaincode
      productId, // Product ID to transfer
      distributerName // distributer receiving the product
    );

    const decodedResult = new TextDecoder().decode(result);

    res.status(200).json({
      success: true,
      message: "Product transferred to distributer successfully.",
      data: { result: decodedResult },
    });
  } catch (error) {
    console.error("Error transferring product:", error);
    res.status(500).json({
      success: false,
      message: "Error transferring product.",
      data: { error: error.message },
    });
  }
});

router.post("/queryAllOrders", async (req, res) => {
  try {
    let distributerClient = new clientApplication();
    let order = await distributerClient.submitTxn(
      "distributer",
      "agrichannel",
      "Supply-chain",
      "OrderContract",
      "queryTxn",
      "",
      "queryAllOrders"
    );
    const data = new TextDecoder().decode(order);
    const value = JSON.parse(data);

    res.status(200).json({
      success: true,
      message: "data query successfully!",
      data: { value },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Please check the ID!",
      data: { error },
    });
  }
});

module.exports = router;
