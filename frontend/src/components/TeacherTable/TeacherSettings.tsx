"use client";
import React, { useState } from "react";

export interface TeacherData {
  name: string;
  profilePicture: string;
  headline: string;
  institution: string;
  courses: string;
  status: "Active" | "Inactive";
}

interface PermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacherName: string;
  permissions: { id: string; label: string; checked: boolean }[];
  onPermissionChange: (id: string, checked: boolean) => void;
}

const PermissionModal: React.FC<PermissionModalProps> = ({
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
        <h2 className="text-xl font-bold mb-4">Permissions for {teacherName}</h2>
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

export interface TeacherSettingsTableProps {
  data: TeacherData[];
}

const TeacherSettingsTable: React.FC<TeacherSettingsTableProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherData | null>(null);
  const [permissions, setPermissions] = useState([
    { id: "create_course", label: "Create Course", checked: false },
    { id: "edit_course", label: "Edit Course", checked: false },
    { id: "delete_course", label: "Delete Course", checked: false },
  ]);

  const handlePermissionsClick = (teacher: TeacherData) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  };

  const handlePermissionChange = (id: string, checked: boolean) => {
    setPermissions(permissions.map(perm => 
      perm.id === id ? { ...perm, checked } : perm
    ));
  };

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="overflow-auto max-h-[480px]">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">Profile</th>
              <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">Headline</th>
              <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">Institution</th>
              {/* <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">Courses</th> */}
              <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((teacher, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={teacher.profilePicture}
                    alt={`${teacher.name}'s profile`}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{teacher.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{teacher.headline}</td>
                <td className="px-6 py-4 whitespace-nowrap">{teacher.institution}</td>
                {/* <td className="px-6 py-4 whitespace-nowrap">{teacher.courses}</td> */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600"
                    onClick={() => handlePermissionsClick(teacher)}
                  >
                    Permissions
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PermissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        teacherName={selectedTeacher?.name || ""}
        permissions={permissions}
        onPermissionChange={handlePermissionChange}
      />
    </div>
  );
};

export default TeacherSettingsTable;