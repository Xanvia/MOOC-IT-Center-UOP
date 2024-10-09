"use client";

import React from "react";

export interface PermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacherName: string;
  permissions: { id: string; label: string; checked: boolean }[];
  onPermissionChange: (id: string, checked: boolean) => void;
}

const TeacherPermissionModal: React.FC<PermissionModalProps> = ({
  isOpen,
  onClose,
  teacherName,
  permissions,
  onPermissionChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-xl font-semibold mb-4">
        Permissions for <span className="font-bold">{teacherName}</span>
      </h2>

        <div className="mb-4">
          {permissions.map((permission) => (
            <div key={permission.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={permission.id}
                checked={permission.checked}
                onChange={(e) => onPermissionChange(permission.id, e.target.checked)}
                className="mr-2"
              />
              <label htmlFor={permission.id}>{permission.label}</label>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TeacherPermissionModal;
