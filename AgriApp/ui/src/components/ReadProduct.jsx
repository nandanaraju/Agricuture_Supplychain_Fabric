import React, { useState } from "react";
import { toast } from "react-toastify";

const ReadProductPage = () => {
  const [productId, setProductId] = useState("");
  const [productData, setProductData] = useState(null);
  const [wholesalerName, setWholesalerName] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

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
      setSuccessMessage(""); // Clear the success message if a new product is read
    } else {
      toast.error("Please check product ID");
    }
  };

  const resetForm = () => {
    setProductId("");
    setProductData(null);
    setWholesalerName("");
    setSuccessMessage(""); // Clear the success message
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
      setProductData(null);
      setProductId("");
      setSuccessMessage(""); // Clear the success message
    } else {
      toast.error(result.message || "Error deleting product");
    }
  };

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
      setSuccessMessage(
        `Transferred to the  wholesaler: ${wholesalerName}`
      ); // Set the success message
      setProductData(null);
      setProductId("");
      setWholesalerName("");
    } else {
      toast.error(result.message || "Error transferring product");
    }
  };

  return (
    <section
      className="h-screen flex justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage: `url("https://www.apacoutlookmag.com/media/Agriculture-Sensor-Technology-Ritam-Gandhi.png")`,
      }}
    >
      <div className="container mx-auto max-w-3xl px-4">
        <div className="bg-white bg-opacity-80 px-6 py-8 shadow-lg rounded-md border">
          <h2 className="text-3xl text-green-800 text-center font-semibold mb-6">
            Read Product
          </h2>

          <form onSubmit={submitForm} className="mb-6">
            <div className="mb-4">
              <label
                htmlFor="productId"
                className="block text-gray-700 font-bold mb-2"
              >
                Product ID
              </label>
              <input
                type="text"
                id="productId"
                name="productId"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Read
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Reset
              </button>
            </div>
          </form>

          {productData && (
            <div className="mt-6">
              <div className="bg-white bg-opacity-90 p-4 rounded shadow-md">
                <h3 className="text-xl font-semibold text-green-700 mb-4">
                  Product Details
                </h3>
                <ul className="text-gray-700 space-y-2">
                  {Object.entries(productData).map(([key, value]) => (
                    <li key={key}>
                      <strong>{key}:</strong> {value}
                    </li>
                  ))}
                </ul>

                <div className="mt-4">
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
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={wholesalerName}
                    onChange={(e) => setWholesalerName(e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-between mt-6">
                  <button
                    type="button"
                    onClick={transferProduct}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Transfer to Wholesaler
                  </button>
                  <button
                    type="button"
                    onClick={deleteProduct}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Delete Product
                  </button>
                </div>
              </div>
            </div>
          )}

          {successMessage && (
            <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded">
              <p className="text-green-800 font-medium">{successMessage}</p>
            </div>
          )}
        </div>
        <div className="mt-2 text-center">
            <a
              href="/manufacturer"
              className="inline-block px-4 py-2 bg-black text-white font-semibold rounded "
            >
              Back to Dashboard
            </a>
          </div>
      </div>
    </section>
  );
};

export default ReadProductPage;
