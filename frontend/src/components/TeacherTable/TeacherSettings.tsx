"use client";

import React, { useState } from "react";
import { Permission } from "@/components/Course/types";
import PermissionModal from "./TeacherPermissionModal"; 

export interface TeacherData {
  id: string;
  name: string;
  profilePicture: string;
  headline: string;
  institution: string;
  courses: string;
  status: "Active" | "Inactive";
}

export interface TeacherSettingsTableProps {
  data: TeacherData[];
}

const TeacherSettingsTable: React.FC<TeacherSettingsTableProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherData | null>(null);
  const [permissions, setPermissions] = useState([
    { id: "view_course_content", label: "View course content", checked: false },
    { id: "create_course_content", label: "Create course content", checked: false },
    { id: "edit_course_content", label: "Edit course content", checked: false },
    { id: "delete_course_content", label: "Delete course content", checked: false },
    { id: "manage_students", label: "Manage students", checked: false },
    { id: "view_reports", label: "View reports", checked: false },
    { id: "grade_assignments", label: "Grade assignments", checked: false },
    { id: "manage_forum", label: "Manage forum", checked: false },
    { id: "upload_files", label: "Upload files", checked: false },
    { id: "edit_course_public_details", label: "Edit course public details", checked: false },
    { id: "make_announcements", label: "Make announcements", checked: false },
  ]);

  const fetchTeacherPermissions = async (teacherId: string) => {
    try {
      // Fetch permissions for the specific teacher from the API
      const response = await fetch(`/api/permissions/?teacher_id=${teacherId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch permissions");
      }
      const data = await response.json();
  
      // Update permissions state based on fetched data
      setPermissions(
        permissions.map((permission) => ({
          ...permission,
          checked: data.find((p: { id: string }) => p.id === permission.id)?.checked || false,
        }))
      );
    } catch (error) {
      console.error("Error fetching teacher permissions:", error);
    }
  };
  
  // Mock function to save permissions for a specific teacher
  const saveTeacherPermissions = async (teacherId: string, updatedPermissions: Permission[]) => {
    try {
      const response = await fetch("/api/permissions/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teacher_id: teacherId, permissions: updatedPermissions }),
      });
      if (!response.ok) {
        throw new Error("Failed to save permissions");
      }
    } catch (error) {
      console.error("Error saving teacher permissions:", error);
    }
  };

  const handlePermissionsClick = (teacher: TeacherData) => {
    setSelectedTeacher(teacher);
    fetchTeacherPermissions(teacher.id); // Fetch the permissions for the selected teacher
    setIsModalOpen(true);
  };

  const handleSavePermissions = () => {
    if (selectedTeacher) {
      saveTeacherPermissions(selectedTeacher?.id, permissions); // Save updated permissions for the selected teacher
    }
    setIsModalOpen(false);
  };

  const handlePermissionChange = (id: string, checked: boolean) => {
    setPermissions(permissions.map((perm) => 
      perm.id === id ? { ...perm, checked } : perm
    ));
  };
  
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="overflow-auto max-h-[480px]">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 sticky top-0" style={{ zIndex: 1 }}>
            <tr>
              <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">Profile</th>
              <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">Headline</th>
              <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">Institution</th>
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
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="bg-blue-800 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-900"
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
        onSavePermissions={handleSavePermissions} // Pass the function here
      />
    </div>
  );
};

export default TeacherSettingsTable;
