import React, { useState } from "react";
import CloseButton from "../Buttons/CloseButton";
import SolidButton from "../Buttons/SolidButton";

export default function AddTeachersModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [selectedNames, setSelectedNames] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [warningMessage, setWarningMessage] = useState("");

    const namesList = [
        { name: "Aliasssssssce in chanos sdsds", Occupation: "Bank of Celodddddddd naefpo askndddd" },
        { name: "Bob", Occupation: "TM Institute" },
        { name: "David", Occupation: "Professor" },
        { name: "Aliasssssssce in chanos sdsds", Occupation: "Bank of Celodddddddd naefpo askndddd" },
        { name: "Bob", Occupation: "TM Institute" },
        { name: "David", Occupation: "Professor" },
        { name: "Aliasssssssce in chanos sdsds", Occupation: "Bank of Celodddddddd naefpo askndddd" },
        { name: "Bob", Occupation: "TM Institute" },
        { name: "David", Occupation: "Professor" },
        { name: "Aliasssssssce in chanos sdsds", Occupation: "Bank of Celodddddddd naefpo askndddd" },
        { name: "Bob", Occupation: "TM Institute" },
        { name: "David", Occupation: "Professor" },
        { name: "Aliasssssssce in chanos sdsds", Occupation: "Bank of Celodddddddd naefpo askndddd" },
        { name: "Bob", Occupation: "TM Institute" },
        { name: "David", Occupation: "Professor" },
    ];

    const toggleModal = () => {
        setIsOpen(!isOpen);
        setWarningMessage(""); // Reset the warning message when modal is closed
    };

    const handleAddTeacher = (name: string) => {
        setSelectedNames((prevSelected) =>
            prevSelected.includes(name)
                ? prevSelected.filter((n) => n !== name)
                : [...prevSelected, name]
        );
        setWarningMessage(""); // Clear warning message when a teacher is selected
    };

    const handleViewTeacher = (name: string) => {
        alert(`Viewing details for ${name}`);
    };

    const filteredNames = namesList.filter((teacher) =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDone = () => {
        if (selectedNames.length === 0) {
            setWarningMessage("Please select a teacher"); // Set warning message if no names are selected
        } else {
            setConfirmationOpen(true); // Open confirmation modal
        }
    };

    const handleConfirmSubmit = () => {
        console.log("Selected names:", selectedNames);
        setIsOpen(false); // Close main modal
        setConfirmationOpen(false); // Close confirmation modal
        setSelectedNames([]); // Reset selected names
    };

    const handleCancelSubmit = () => {
        setConfirmationOpen(false); // Close confirmation modal
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
                    className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
                    onClick={toggleModal}
                >
                    <div
                        className="bg-white py-10 px-5 sm:px-16 rounded-lg shadow-lg relative max-w-6xl w-full"
                        onClick={(e) => e.stopPropagation()}
                        
                    >
                        <CloseButton onClick={toggleModal} />
                        <h2 className="text-xl font-bold mb-6 text-center ">Assign the Teacher to the Course </h2>

                        <input
                            type="text"
                            placeholder="Search names..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="max-h-60 overflow-y-auto">  
                        <table className="w-full mb-4">
                            <thead>
                                <tr>
                                    <th className="text-left font-semibold p-2">Name</th>
                                    <th className="text-left font-semibold p-2">Occupation</th>
                                    <th className="text-right font-semibold p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredNames.length > 0 ? (
                                    filteredNames.map((teacher) => (
                                        <tr
                                            key={teacher.name}
                                            className={`border-b ${
                                                selectedNames.includes(teacher.name)
                                                    ? "border-blue-500 bg-blue-50"
                                                    : ""
                                            }`}
                                        >
                                            <td className="p-2">{teacher.name}</td>
                                            <td className="p-2">{teacher.Occupation}</td>
                                            <td className="p-2 text-right space-x-2">
                                                <button
                                                    onClick={() => handleAddTeacher(teacher.name)}
                                                    className="px-3 py-1 bg-blue-700 text-white rounded hover:bg-blue-800  mb-1"
                                                >
                                                    {selectedNames.includes(teacher.name) ? "Unselect Teacher" : "Select Teacher"}
                                                </button>
                                                <button
                                                    onClick={() => handleViewTeacher(teacher.name)}
                                                    className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                                                >
                                                    View Profile
                                                </button>
                                            </td>
                                        </tr>
                                        
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="text-center text-gray-500 p-4">
                                            No results found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        </div>
                        <div className="mt-8">

                          {warningMessage && (
                              <p className="text-red-500 text-center mb-4">{warningMessage}</p>
                          )}

                          <div className="flex justify-end">
                              <SolidButton onClick={handleDone} type="submit" text="ADD the Teacher" />
                          </div>
                        </div>
                    </div>
                </div>
            )}

            {confirmationOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-20">
                    <div className="bg-white py-6 px-10 rounded-lg shadow-lg w-80 text-center">
                        <h3 className="text-lg font-semibold mb-4">Are you sure to submit?</h3>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={handleConfirmSubmit}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Yes
                            </button>
                            <button
                                onClick={handleCancelSubmit}
                                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
