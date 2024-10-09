"use client";

import React from "react";
import SolidButton from "../Buttons/SolidButton";
import CloseButton from "../Buttons/CloseButton"; // Import the CloseButton component

interface Permission {
  id: string;
  label: string;
  checked: boolean;
}

interface TeacherPermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacherName: string;
  permissions: Permission[];
  onPermissionChange: (id: string, checked: boolean) => void;
}

const TeacherPermissionModal: React.FC<TeacherPermissionModalProps> = ({
  isOpen,
  onClose,
  teacherName,
  permissions,
  onPermissionChange,
}) => {
  // Handle outside click to close modal
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleInsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClose();
  };

  // If modal is not open, return null
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onMouseDown={handleInsideClick}
    >
      <div
        className="bg-white py-10 px-5 sm:px-10 rounded-lg shadow-lg relative max-w-xl w-full"
        onMouseDown={handleOutsideClick}
      >
        {/* Close Button at the top-right corner */}
        <div className="absolute top-2 right-2">
          <CloseButton onClick={onClose} /> {/* Use CloseButton component */}
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
              <label htmlFor={permission.id}>{permission.label}</label>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 mr-2 rounded hover:bg-blue-600"
          >
            Close
          </button>
          <SolidButton type="submit" text="D O N E" />
        </div>
      </div>
    </div>
  );
};

export default TeacherPermissionModal;
