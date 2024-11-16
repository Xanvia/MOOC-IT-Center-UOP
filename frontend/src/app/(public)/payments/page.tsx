"use client";
import React from "react";

export default function Payments() {
  return (
    <>
      <div className="container mx-auto px-4 mt-20 flex flex-col items-center justify-center">
        {/* Page Title */}
        <h1 className="text-3xl font-bold mb-8">Payments</h1>

        {/* First Week Trial Section */}
        <div className="border border-gray-300 rounded-md p-8 text-center shadow-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">First Week Trial</h2>
          <p className="text-gray-600 mb-6">Hello Welcome</p>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
            Start
          </button>
        </div>

        {/* Switch Button */}
        <div className="mt-8">
          <button className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600">
            Switch
          </button>
        </div>
      </div>
    </>
  );
}
