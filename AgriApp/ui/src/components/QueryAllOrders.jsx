import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const QueryAllOrders = () => {
  const [orderData, setOrderData] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); // Success message state

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const res = await fetch("http://localhost:5000/queryAllOrders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await res.json();
        if (result.success) {
          setOrderData(result.data.value); // Access the "value" array directly
          setSuccessMessage("Order data retrieved successfully!");
        } else {
          setSuccessMessage(""); // Clear message if no data
          toast.error("No Order data found");
        }
      } catch (error) {
        setSuccessMessage(""); // Clear message on error
        toast.error("An error occurred while fetching the Order data");
      }
    };

    fetchOrderData();
  }, []);

  return (
    <section
      className="h-screen flex justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage: `url("https://www.apacoutlookmag.com/media/Agriculture-Sensor-Technology-Ritam-Gandhi.png")`,
      }}
    >
    {/* <div className="bg-gradient-to-br from-green-500 via-teal-300 to-blue-300 min-h-screen flex flex-col items-center justify-center p-8"> */}
      <div className="bg-white shadow-xl rounded-lg max-w-6xl w-full p-10 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-400 blur-lg opacity-20 rounded-lg"></div>
        <h2 className="relative text-5xl font-extrabold text-green-800 mb-10 text-center">
          Order Inventory
        </h2>

        {/* Success Message */}
        {successMessage && (
          <div className="mt-4 flex items-center justify-center">
            <div className="relative p-4 bg-green-50 border-l-4 border-green-500 text-green-800 rounded-lg shadow-lg w-full max-w-md">
              <p className="font-semibold text-center">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Order Table */}
        {orderData && orderData.length > 0 ? (
          <div className="overflow-x-auto rounded-lg shadow-lg mt-8">
            <h3 className="text-2xl font-bold text-green-700 mb-6 text-center">
              Order Details
            </h3>
            <table className="table-auto min-w-full bg-gradient-to-tr from-green-50 via-white to-teal-50 border border-green-300 rounded-lg">
              <thead>
                <tr className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
                  <th className="px-6 py-4 text-left text-sm font-medium uppercase">Order ID</th>
                  <th className="px-6 py-4 text-left text-sm font-medium uppercase">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-medium uppercase">Quantity</th>
                  <th className="px-6 py-4 text-left text-sm font-medium uppercase">Price </th>
                  <th className="px-6 py-4 text-left text-sm font-medium uppercase">Distributer Name</th>
                </tr>
              </thead>
              <tbody>
                {orderData.map((Order, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-teal-100"
                    } hover:bg-teal-200 transition-colors`}
                  >
                    <td className="px-6 py-4 border-t border-green-300">{Order.Key}</td>
                    <td className="px-6 py-4 border-t border-green-300">{Order.Record.type}</td>
                    <td className="px-6 py-4 border-t border-green-300">{Order.Record.quantity}</td>
                    <td className="px-6 py-4 border-t border-green-300">{Order.Record.price}</td>
                    <td className="px-6 py-4 border-t border-green-300">{Order.Record.distributerName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-6 p-6 bg-red-50 border-l-4 border-red-400 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-semibold text-red-700 mb-4">
              No Order Data Found
            </h3>
            <p className="text-gray-600">
              There is no Order data available at the moment.
            </p>
          </div>
        )}
      </div>
    {/* </div> */}
    </section>
  );
};

export default QueryAllOrders;
