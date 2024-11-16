"use client";
import React, { useState } from "react";

export default function Payments() {
  // State to toggle between the two UIs
  const [isPaymentStage, setIsPaymentStage] = useState(false);

  // Toggle function
  const handleToggle = () => {
    setIsPaymentStage(!isPaymentStage); // Toggle the state
  };

  return (
    <div className="container mx-auto px-4 mt-20 flex flex-col items-center justify-center">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-8">Payments Details</h1>

      {/* Conditional Rendering Based on State */}
      {isPaymentStage ? (
        // Payment Stage UI
        <div className="border border-gray-300 rounded-md p-8 text-center shadow-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-1">Data analysis for Beginners</h2>
          <p className="text-gray-600 mb-6">
            Offered by <span className="font-semibold  text-gray-800">University of Peradeniya</span>
          </p>
          <div className="flex flex-wrap items-center space-x-8 md:space-x-16 mb-3 ml-2">
            <p className="text-gray-600">
              Course Fee: <span className="text-blue-900 font-semibold">300/=</span>
            </p>
            <p className="text-gray-600">Fulltime Access
            <span className="text-green-500 text-xl ml-2">✔️</span>
            </p>
          </div>
          <button className="bg-blue-800 text-white px-6 py-2 rounded-md hover:bg-blue-900">
            Proceed to Payments
          </button>
          
        </div>
      ) : (
        // First Week Trial UI
        <div className="border border-gray-300 rounded-md p-8 text-center shadow-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-1">Data analysis for Beginners</h2>
          <p className="text-gray-600 mb-6">
            Offered by <span className="font-semibold text-gray-800">University of Peradeniya</span>
          </p>
          <p className="text-gray-600 mt-6 mb-3">You have to do payments before <span className="font-semibold  text-gray-800"> 12/10/2000 </span></p>
          <button className="bg-blue-800 text-white px-6 py-2 rounded-md hover:bg-blue-900">
            Start Your Free Trial
          </button>
          
        </div>
      )}

      {/* Switch Button */}
      <div className="mt-8">
        <button
          onClick={handleToggle}
          className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
        >
          Switch
        </button>
      </div>
    </div>
  );
}
