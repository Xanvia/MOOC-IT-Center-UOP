import React, { useState } from "react";
import CloseButton from "../Buttons/CloseButton";  

export default function AddTeachersModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedNames, setSelectedNames] = useState<string[]>([]);
    
    const namesList = ["Alice", "Bob", "Charlie", "David", "Eve"];
  
    const toggleModal = () => {
      setIsOpen(!isOpen);
    };
  
    const handleNameSelect = (name: string) => {
      setSelectedNames((prevSelected) =>
        prevSelected.includes(name)
          ? prevSelected.filter((n) => n !== name) // Unselect if already selected
          : [...prevSelected, name] // Add if not selected
      );
    };
  
    const handleDone = () => {
      console.log("Selected names:", selectedNames);
      setIsOpen(false); // Close modal on done
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
            className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-10"
            onClick={toggleModal}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={toggleModal} />
              <h2 className="text-xl font-bold mb-4 text-center">Select Names</h2>
              
              <div className="space-y-2 mb-4">
                {namesList.map((name) => (
                  <label key={name} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedNames.includes(name)}
                      onChange={() => handleNameSelect(name)}
                      className="form-checkbox text-blue-600"
                    />
                    <span>{name}</span>
                  </label>
                ))}
              </div>
  
              <button
                onClick={handleDone}
                className="mt-4 w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </>
    );
  }