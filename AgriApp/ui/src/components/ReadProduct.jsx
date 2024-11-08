import React, { useState } from "react";
import { toast } from "react-toastify";

const ReadProductPage = () => {
  const [productId, setProductId] = useState("");
  const [productData, setProductData] = useState(null);
  const [wholesalerName, setWholesalerName] = useState(""); // Added state for wholesaler name

  const submitForm = async (e) => {
    e.preventDefault();
    const readDetails = { productId };

    const res = await fetch("/api/readproduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(readDetails),
    });

    const result = await res.json();
    if (result.success) {
      setProductData(result.data.value);
    } else {
      toast.error("Please check product ID");
    }
  };

  const resetForm = () => {
    setProductId(""); // Clear the input field
    setProductData(null); // Clear the fetched data
    setWholesalerName(""); // Clear the wholesaler name
  };

  const deleteProduct = async () => {
    if (!productId) {
      toast.error("Product ID is required to delete");
      return;
    }

    const deleteDetails = { productId };

    const res = await fetch("/api/deleteproduct", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deleteDetails),
    });

    const result = await res.json();
    if (result.success) {
      toast.success("Product deleted successfully!");
      setProductData(null); // Clear the product data on successful deletion
      setProductId(""); // Clear the input field
    } else {
      toast.error(result.message || "Error deleting product");
    }
  };

  // Function to handle product transfer
  const transferProduct = async () => {
    if (!wholesalerName || !productId) {
      toast.error("Both product ID and wholesaler name are required for transfer");
      return;
    }

    const transferDetails = { productId, wholesalerName };

    const res = await fetch("/api/transferToWholesaler", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transferDetails),
    });

    const result = await res.json();
    if (result.success) {
      toast.success("Product transferred successfully!");
      setProductData(null); // Clear the product data after transfer
      setProductId(""); // Clear the product ID field
      setWholesalerName(""); // Clear the wholesaler name field
    } else {
      toast.error(result.message || "Error transferring product");
    }
  };

  return (
    <div className="bg-white flex items-center justify-center m-20">
      <div className="bg-blue-100 p-10 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-3xl font-bold text-blue-700 mb-4 text-center">
          Read Product
        </h2>
        <form onSubmit={submitForm}>
          <div className="mb-4">
            <label
              htmlFor="productId"
              className="block text-gray-700 font-bold mb-2"
            >
              Product Id
            </label>
            <input
              type="text"
              id="productId"
              name="productId"
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Read
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Reset
            </button>
          </div>
        </form>

        {/* Conditionally render product data */}
        {productData && (
          <div className="mt-6 bg-white p-4 rounded shadow-md">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">
              Product Details
            </h3>
            <ul className="text-gray-700">
              {Object.entries(productData).map(([key, value]) => (
                <li key={key} className="mb-1">
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>

            <div className="mt-4 mb-4">
              <label
                htmlFor="wholesalerName"
                className="block text-gray-700 font-bold mb-2"
              >
                Wholesaler Name
              </label>
              <input
                type="text"
                id="wholesalerName"
                name="wholesalerName"
                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={wholesalerName}
                onChange={(e) => setWholesalerName(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between mb-6">
              <button
                type="button"
                onClick={transferProduct}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Transfer to Wholesaler
              </button>
              <button
                type="button"
                onClick={deleteProduct}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete Product
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadProductPage;
