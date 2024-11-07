import React, { useState } from "react";
import CloseButton from "../Buttons/CloseButton";  

export default function AddTeachersModal() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Open Modal
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center  z-10"
          onClick={toggleModal}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={toggleModal} />
            <h2 className="text-xl font-bold mb-4 text-center">Add Teachers to the Course</h2>
            <p className="text-gray-700 text-center">This is a simple modal content.</p>
          </div>
        </div>
      )}
    </>
  );
}
