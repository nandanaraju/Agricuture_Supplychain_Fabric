import React, { useState } from "react";
import { toast } from "react-toastify";

const ReadProductPage = () => {
  const [productId, setProductId] = useState("");
  const [productData, setProductData] = useState(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const readDetails = {
      productId,
    };

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
            <button
              onClick={deleteProduct}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete Product
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadProductPage;
