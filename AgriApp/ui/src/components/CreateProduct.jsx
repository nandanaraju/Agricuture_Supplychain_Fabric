import React, { useState } from "react";

const CreateProductPage = () => {
  const [productId, setProductId] = useState('');
  const [type, setType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [harvestDate, setHarvestDate] = useState('');
  const [origin, setOrigin] = useState('');
  const [producerName, setProducerName] = useState('');
  const [message, setMessage] = useState(''); // State to display messages

  const submitForm = (e) => {
    e.preventDefault();

    const newProduct = {
      productId,
      type,
      quantity,
      harvestDate,
      origin,
      producerName,
    };

    addProduct(newProduct);
  };

  const addProduct = async (newProduct) => {
    try {
      const res = await fetch('/api/createproduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      const result = await res.json();

      if (result.success) {
        setMessage(`Success: ${result.message}`);
        // Clear the form fields after successful submission
        setProductId('');
        setType('');
        setQuantity('');
        setHarvestDate('');
        setOrigin('');
        setProducerName('');
      } else {
        setMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Request error:', error);
      setMessage('An error occurred while creating the product.');
    }
  };

  return (
    <>
      <section className="bg-white mb-20 flex">
        <div className="container m-auto max-w-xl py-2">
          <div className="bg-blue-100 px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <form onSubmit={submitForm}>
              <h2 className="text-3xl text-blue-800 text-center font-semibold mb-6">
                Create Product
              </h2>

              {message && (
                <div
                  className={`mb-4 p-3 rounded ${
                    message.startsWith('Success')
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {message}
                </div>
              )}

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Product Id
                </label>
                <input
                  type="text"
                  id="productId"
                  name="productId"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. Product-01"
                  required
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Type
                </label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. Paddy"
                  required
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Quantity
                </label>
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. 10"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Harvest Date
                </label>
                <input
                  type="text"
                  id="harvestDate"
                  name="harvestDate"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. 12/10/2024"
                  required
                  value={harvestDate}
                  onChange={(e) => setHarvestDate(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Origin
                </label>
                <input
                  type="text"
                  id="origin"
                  name="origin"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. Kerala"
                  required
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Producer Name
                </label>
                <input
                  type="text"
                  id="producerName"
                  name="producerName"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. Factory-01"
                  required
                  value={producerName}
                  onChange={(e) => setProducerName(e.target.value)}
                />
              </div>

              <div>
                <button
                  className="bg-blue-500 hover:bg-blue-600 my-10 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Create Product
                </button>
              </div>
            </form>
            <a href=""></a>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateProductPage;
