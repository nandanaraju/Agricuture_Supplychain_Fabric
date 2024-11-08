import React, { useState } from 'react';

const ReadOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const [message, setMessage] = useState('');

  const handleReadOrder = async () => {
    try {
      const response = await fetch(`http://localhost:5000/readOrder/${orderId}`);
      if (response.ok) {
        const data = await response.json();
        setOrderDetails(data);
        setMessage('');
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Failed to fetch order.');
      }
    } catch (error) {
      setMessage('An error occurred while fetching the order.');
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Read Order</h2>
      <div className="mb-4">
        <label htmlFor="orderId" className="block text-gray-700 font-medium mb-2">Order ID:</label>
        <input
          type="text"
          id="orderId"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex justify-center mb-4">
        <button
          onClick={handleReadOrder}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Fetch Order
        </button>
      </div>
      {message && <p className="text-red-600 text-center mb-4">{message}</p>}
      {orderDetails && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Details</h3>
          <pre className="text-gray-700 whitespace-pre-wrap">{JSON.stringify(orderDetails, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ReadOrder;
