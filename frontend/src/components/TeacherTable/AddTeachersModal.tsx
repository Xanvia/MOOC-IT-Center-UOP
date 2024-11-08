import React, { useState } from "react";
import CloseButton from "../Buttons/CloseButton";
import SolidButton from "../Buttons/SolidButton";

export default function AddTeachersModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [selectedNames, setSelectedNames] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const namesList = [
        { name: "Alice", work: "Bank of Celon" },
        { name: "Bob", work: "TM Institute" },
        { name: "David", work: "Professor" },
    ];

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const handleAddTeacher = (name: string) => {
        setSelectedNames((prevSelected) =>
            prevSelected.includes(name)
                ? prevSelected.filter((n) => n !== name)
                : [...prevSelected, name]
        );
    };

    const handleViewTeacher = (name: string) => {
        alert(`Viewing details for ${name}`);
    };

    const filteredNames = namesList.filter((teacher) =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDone = () => {
        setConfirmationOpen(true); // Open confirmation modal
    };

    const handleConfirmSubmit = () => {
        console.log("Selected names:", selectedNames);
        setIsOpen(false); // Close main modal
        setConfirmationOpen(false); // Close confirmation modal
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

                        <table className="w-full mb-4">
                            <thead>
                                <tr>
                                    <th className="text-left font-semibold p-2">Name</th>
                                    <th className="text-left font-semibold p-2">Work</th>
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
                                            <td className="p-2">{teacher.work}</td>
                                            <td className="p-2 text-right space-x-2">
                                                <button
                                                    onClick={() => handleAddTeacher(teacher.name)}
                                                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                                                >
                                                    {selectedNames.includes(teacher.name) ? "Added" : "Add"}
                                                </button>
                                                <button
                                                    onClick={() => handleViewTeacher(teacher.name)}
                                                    className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                                                >
                                                    View
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

                        <div className="flex justify-end">
                            <SolidButton onClick={handleDone} type="submit" text="SUBMIT" />
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
