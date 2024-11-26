import React, { useState } from 'react';

const CreateOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [type, setType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [distributerName, setDistributerName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/createOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          type,
          quantity,
          price,
          distributerName,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Failed to create order.');
      }
    } catch (error) {
      setMessage('An error occurred while creating the order.');
      console.error(error);
    }
  };

  return (
    <>
      <section
        className="h-screen flex justify-center items-center bg-cover bg-center"
        style={{
          backgroundImage: `url("https://www.apacoutlookmag.com/media/Agriculture-Sensor-Technology-Ritam-Gandhi.png")`,
        }}
      >
        <div className="container mx-auto max-w-4xl px-4">
          <div className="bg-white bg-opacity-80 px-6 py-8 shadow-lg rounded-md border">
            <form onSubmit={handleSubmit}>
              <h2 className="text-3xl text-green-800 text-center font-semibold mb-6">
                Create Order
              </h2>

              {message && (
                <div
                  className={`mb-4 p-3 rounded ${
                    message.includes('success')
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {message}
                </div>
              )}

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Order ID</label>
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  required
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. Order-01"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Type</label>
                <input
                  type="text"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. Vegetables"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. 100"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Price</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. 1000"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Distributor Name</label>
                <input
                  type="text"
                  value={distributerName}
                  onChange={(e) => setDistributerName(e.target.value)}
                  required
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. Distributor-01"
                />
              </div>

              <div>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Create Order
                </button>
              </div>
            </form>
            <div className="mt-2 text-center">
            <a
              href="/distributer"
              className="inline-block px-4 py-2 bg-black text-white font-semibold rounded "
            >
              Back to Dashboard
            </a>
          </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateOrder;
