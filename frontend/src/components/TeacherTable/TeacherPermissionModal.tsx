"use client";

import React, { useState } from "react";
import SolidButton from "../Buttons/SolidButton";
import CloseButton from "../Buttons/CloseButton";

type Permission = {
  id: string;
  label: string;
  checked: boolean;
};

interface TeacherPermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacherName: string;
  permissions: Permission[];
  onPermissionChange: (id: string, checked: boolean) => void;
  onSavePermissions: () => void; // New prop for submitting
}

const TeacherPermissionModal: React.FC<TeacherPermissionModalProps> = ({
  isOpen,
  onClose,
  teacherName,
  permissions,
  onPermissionChange,
  onSavePermissions,
}) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  // Handle outside click to close modal
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleInsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClose();
  };

  const handleDoneClick = () => {
    setIsConfirmationOpen(true);
  };

  const handleConfirmYes = () => {
    setIsConfirmationOpen(false);
    onSavePermissions(); // Submit the permissions
    onClose(); // Close the modal after saving
  };

  const handleConfirmNo = () => {
    setIsConfirmationOpen(false);
  };

  // Utility function to format the label
  const formatPermissionLabel = (label: string) => {
    return label
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // If modal is not open, return null
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10"
      onMouseDown={handleInsideClick}
    >
      <div
        className="bg-white py-10 px-5 sm:px-10 rounded-lg shadow-lg relative max-w-xl w-full"
        onMouseDown={handleOutsideClick}
      >
        <div className="absolute top-2 right-2">
          <CloseButton onClick={onClose} />
        </div>

        <h2 className="text-center text-2xl mb-8">
          Permissions for <span className="font-bold">{teacherName}</span>
        </h2>

        <div className="mb-8">
          {permissions.map((permission) => (
            <div key={permission.id} className="flex items-center mb-3">
              <input
                type="checkbox"
                id={permission.id}
                checked={permission.checked}
                onChange={(e) =>
                  onPermissionChange(permission.id, e.target.checked)
                }
                className="mr-2"
              />
              <label htmlFor={permission.id}>
                {formatPermissionLabel(permission.label)}
              </label>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <SolidButton type="button" text="DONE" onClick={handleDoneClick} />
        </div>

        {/* Confirmation Modal */}
        {isConfirmationOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
              <h3 className="text-lg font-semibold mb-4">
                Are you sure to Submit?
              </h3>
              <div className="flex justify-around mt-4">
                <button
                  className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-900"
                  onClick={handleConfirmYes}
                >
                  Yes
                </button>
                <button
                  className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                  onClick={handleConfirmNo}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherPermissionModal;
