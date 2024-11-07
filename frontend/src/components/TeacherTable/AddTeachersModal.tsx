import React, { useState } from "react";
import CloseButton from "../Buttons/CloseButton"; 
import SolidButton from "../Buttons/SolidButton"; 

export default function AddTeachersModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedNames, setSelectedNames] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const namesList = ["Alice", "Bob", "Charlie", "David", "Eve"];
  
    const toggleModal = () => {
      setIsOpen(!isOpen);
    };
  
    const handleNameSelect = (name: string) => {
      setSelectedNames((prevSelected) =>
        prevSelected.includes(name)
          ? prevSelected.filter((n) => n !== name) 
          : [...prevSelected, name] 
      );
    };
    
    const filteredNames = namesList.filter((name) =>
        name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const handleDone = () => {
      console.log("Selected names:", selectedNames);
      setIsOpen(false); 
    };
  
    return (
      <>
        <button
          onClick={toggleModal}
          className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-900"
        >
          Add Teachers
        </button>
  
        {isOpen && (
          <div
            className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-10"
            onClick={toggleModal}
          >
            <div
              className="bg-white py-10 px-5 sm:px-16 rounded-lg shadow-lg relative max-w-xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={toggleModal} />
              <h2 className="text-xl font-bold mb-4 text-center">Add The Teachers</h2>
              
              <input
              type="text"
              placeholder="Search names..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            
            <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
              {filteredNames.length > 0 ? (
                filteredNames.map((name) => (
                  <label key={name} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedNames.includes(name)}
                      onChange={() => handleNameSelect(name)}
                      className="form-checkbox text-blue-600"
                    />
                    <span>{name}</span>
                  </label>
                ))
              ) : (
                <p className="text-gray-500 text-center">No results found</p>
              )}
            </div>
  
              <div className="flex justify-end">
                <SolidButton type="submit" text="S U B M I T" />
            </div>
            </div>
          </div>
        )}
      </>
    );
  }