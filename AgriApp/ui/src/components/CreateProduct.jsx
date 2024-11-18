import React, { useState } from "react";

const CreateProductPage = () => {
  const [productId, setProductId] = useState("");
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [harvestDate, setHarvestDate] = useState("");
  const [origin, setOrigin] = useState("");
  const [producerName, setProducerName] = useState("");
  const [message, setMessage] = useState("");

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
      const res = await fetch("/api/createproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const result = await res.json();

      if (result.success) {
        setMessage(`Success: ${result.message}`);
        setProductId("");
        setType("");
        setQuantity("");
        setHarvestDate("");
        setOrigin("");
        setProducerName("");
      } else {
        setMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Request error:", error);
      setMessage("An error occurred while creating the product.");
    }
  };

  return (
    <section
      className="h-screen flex justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage: `url("https://www.apacoutlookmag.com/media/Agriculture-Sensor-Technology-Ritam-Gandhi.png")`,
      }}
    >
      <div className="container mx-auto px-4">
        <div className="bg-white bg-opacity-80 px-6 py-8 shadow-lg rounded-md border max-w-lg mx-auto">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-green-800 text-center font-semibold mb-6">
              Create Product
            </h2>

            {message && (
              <div
                className={`mb-2 p-3 rounded ${
                  message.startsWith("Success")
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {message}
              </div>
            )}

            <div className="mb-2">
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

            <div className="mb-2">
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

            <div className="mb-2">
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

            <div className="mb-2">
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

            <div className="mb-2">
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

            <div className="mb-2">
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
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Create Product
              </button>
            </div>
          </form>

          
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

export default CreateProductPage;
