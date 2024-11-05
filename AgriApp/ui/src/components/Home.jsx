import React from 'react';
import logo from '../assets/images/images.png'; // Replace with the actual path of your logo image

function HomePage() {
  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      {/* Navbar */}
      <header className="flex items-center justify-between p-6 bg-blue-900 text-white">
        <img src={logo} alt="Agrichain Logo" className="h-10" />
        <nav className="space-x-6">
          <a href="#home" className="hover:text-green-400">Home</a>
          <a href="#about" className="hover:text-green-400">About the platform</a>
          <a href="#users" className="hover:text-green-400">Our users</a>
          <a href="#features" className="hover:text-green-400">Features</a>
          <a href="#contact" className="hover:text-green-400">Contact us</a>
        </nav>
        <div className="space-x-4">
          <button className="px-4 py-2 border border-white rounded text-white hover:bg-green-500">Login</button>
          <button className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600">Sign Up</button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative text-center text-white h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('farmers-field.jpg')" }}></div>
        <div className="absolute inset-0 bg-black opacity-30"></div>
        
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4 text-green-400">
            Connecting the <span className="text-blue-900">Best</span>
          </h1>
          <button className="mt-4 px-8 py-3 bg-green-500 text-white font-semibold rounded hover:bg-green-600">
            Explore Now
          </button>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
