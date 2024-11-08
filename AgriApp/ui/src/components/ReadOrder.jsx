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
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h2>Read Order</h2>
      <div>
        <label>Order ID:</label>
        <input type="text" value={orderId} onChange={(e) => setOrderId(e.target.value)} />
      </div>
      <button onClick={handleReadOrder}>Fetch Order</button>
      {message && <p>{message}</p>}
      {orderDetails && (
        <div>
          <h3>Order Details</h3>
          <pre>{JSON.stringify(orderDetails, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ReadOrder;
