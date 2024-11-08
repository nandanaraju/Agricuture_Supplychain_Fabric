import React from "react";
import { Link } from "react-router-dom";
import img from '../assets/images/Distributer.png'
const DistributerDashboard = () => {
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center overflow-hidden">
    <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full text-center">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">
        Distributer Dashboard
      </h1>

      <img
        src={img} // Replace with your image URL
        alt="Order Image"
        className="mx-auto mb-6 rounded-lg shadow-md max-h-48 w-auto" 
      />

      {/* Button Container with Flexbox */}
      <div className="flex flex-col gap-4">
        <Link to="/create-order">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-full w-full hover:bg-blue-600">
            Create Order
          </button>
        </Link>
        <Link to="/view-order">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-full w-full hover:bg-blue-600">
          View Orders
          </button>
        </Link>
        <Link to="/read-order">
          <button className="bg-green-500 text-white py-2 px-4 rounded-full w-full hover:bg-green-600">
            Read Order
          </button>
        </Link>
      </div>
    </div>
  </div>
  );
};

export default DistributerDashboard;