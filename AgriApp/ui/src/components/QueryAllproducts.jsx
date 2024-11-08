import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const QueryAllProducts = () => {
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await fetch("http://localhost:5000/queryAllProducts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await res.json();
        if (result.success) {
          setProductData(result.data.value); // Access the "value" array directly
          toast.success("Product data retrieved successfully");
        } else {
          toast.error("No product data found");
        }
      } catch (error) {
        toast.error("An error occurred while fetching the product data");
      }
    };

    fetchProductData();
  }, []);

  return (
    <div className="bg-gradient-to-br from-green-400 via-green-200 to-green-100 min-h-screen flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg max-w-5xl w-full p-8">
        <h2 className="text-4xl font-extrabold text-green-800 mb-8 text-center">
          Product Inventory
        </h2>

        {productData && productData.length > 0 ? (
          <div className="overflow-x-auto rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-green-700 mb-6 text-center">
              Product Details
            </h3>
            <table className="table-auto min-w-full bg-green-50 border border-green-300 rounded-lg">
              <thead>
                <tr className="bg-green-600 text-white">
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase">Product ID</th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase">Quantity</th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase">Harvest Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase">Origin</th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {productData.map((product, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-green-100"
                    } hover:bg-green-200 transition-colors`}
                  >
                    <td className="px-6 py-4 border-t border-green-300">{product.Key}</td>
                    <td className="px-6 py-4 border-t border-green-300">{product.Record.type}</td>
                    <td className="px-6 py-4 border-t border-green-300">{product.Record.quantity}</td>
                    <td className="px-6 py-4 border-t border-green-300">{product.Record.harvestDate}</td>
                    <td className="px-6 py-4 border-t border-green-300">{product.Record.origin}</td>
                    <td className="px-6 py-4 border-t border-green-300">{product.Record.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-6 p-6 bg-red-50 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-semibold text-red-700 mb-4">
              No Product Data Found
            </h3>
            <p className="text-gray-700">
              There is no product data available at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QueryAllProducts;
