import React, { useState } from 'react';

const DeleteOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [message, setMessage] = useState('');

  const handleDeleteOrder = async () => {
    try {
      const response = await fetch(`http://localhost:5000/deleteOrder/${orderId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Failed to delete order.');
      }
    } catch (error) {
      setMessage('An error occurred while deleting the order.');
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h2>Delete Order</h2>
      <div>
        <label>Order ID:</label>
        <input type="text" value={orderId} onChange={(e) => setOrderId(e.target.value)} />
      </div>
      <button onClick={handleDeleteOrder}>Delete Order</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteOrder;
