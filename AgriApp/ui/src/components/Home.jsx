import React, { useState } from 'react';
import logo from '../assets/images/logo.png';
import img1 from '../assets/images/image.png';
import manufacturerImg from '../assets/images/images.png';
import distributerImg from '../assets/images/images.png';
import wholesalerImg from '../assets/images/images.png';
import marketImg from '../assets/images/images.png';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const navigate = useNavigate();

  const openLoginModal = () => setIsLoginOpen(true);
  const closeLoginModal = () => setIsLoginOpen(false);

  const handleRoleClick = (role) => {
    navigate('/login', { state: { userType: role } });
  };

  return (
    <div className="font-sans bg-white min-h-screen">
      {/* Navbar */}
      <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-md">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Agrichain Logo" className="h-10" />
          <h1 className="text-2xl font-extrabold text-green-700 tracking-wide">
            AGRICHAIN
          </h1>
        </div>
        <nav className="space-x-8">
          <a href="#home" className="text-gray-700 font-medium hover:text-green-700 transition duration-300">
            Home
          </a>
          <a href="#about" className="text-gray-700 font-medium hover:text-green-700 transition duration-300">
            About
          </a>
          <a href="#contact" className="text-gray-700 font-medium hover:text-green-700 transition duration-300">
            Contact
          </a>
        </nav>
        <div className="space-x-4">
          <button
            onClick={openLoginModal}
            className="px-4 py-2 border border-green-700 text-green-700 rounded hover:bg-green-700 hover:text-white transition duration-300"
          >
            Login
          </button>
          
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center md:space-x-10">
          <div className="md:w-1/2 text-left">
            <h2 className="text-5xl font-bold text-gray-800 leading-tight mb-4">
              Blockchain <span className="text-green-700">Agriculture Supply Chain</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              A powerful agriculture supply chain management software tailor-made to support food companies
              in creating a sustainable and efficient supply chain using crop sourcing management, contract
              farming, and outgrower management features.
            </p>
          </div>
          <div className="mt-8 md:mt-0 md:w-1/2">
            <img src={img1} alt="Dashboard Mockup" className="w-full rounded" />
          </div>
        </div>
      </main>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Choose Your Role</h2>
              <button onClick={closeLoginModal} className="text-gray-600 hover:text-gray-800">
                &times;
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div
                className="text-center cursor-pointer"
                onClick={() => handleRoleClick('manufacturer')}
              >
                <img src={manufacturerImg} alt="Manufacturer" className="h-24 mx-auto mb-2" />
                <p className="text-gray-700 font-medium">Manufacturer</p>
              </div>
              <div
                className="text-center cursor-pointer"
                onClick={() => handleRoleClick('distributer')}
              >
                <img src={distributerImg} alt="Distributer" className="h-24 mx-auto mb-2" />
                <p className="text-gray-700 font-medium">Distributer</p>
              </div>
              <div
                className="text-center cursor-pointer"
                onClick={() => handleRoleClick('wholesaler')}
              >
                <img src={wholesalerImg} alt="Wholesaler" className="h-24 mx-auto mb-2" />
                <p className="text-gray-700 font-medium">Wholesaler</p>
              </div>
              <div
                className="text-center cursor-pointer"
                onClick={() => handleRoleClick('market')}
              >
                <img src={marketImg} alt="Market" className="h-24 mx-auto mb-2" />
                <p className="text-gray-700 font-medium">Market</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
