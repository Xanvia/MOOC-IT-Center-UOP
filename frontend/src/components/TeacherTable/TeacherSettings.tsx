"use client";

import React, { useState } from "react";
import PermissionModal from "./TeacherPermissionModal";
import { getTeacherPermissions } from "@/services/settings.service";
import { useParams } from "next/navigation";
export interface TeacherData {
  id: string;
  name: string;
  profile_picture: string;
  email: string;
  role: keyof typeof Roles;
}

type Permission = {
  id: string;
  label: string;
  checked: boolean;
};

export interface TeacherSettingsTableProps {
  data: TeacherData[];
}

const Roles = {
  "non-editing_teacher": "Non-Editing Teacher",
  editing_teacher: "Editing Teacher",
  teacher: "Teacher",
};

const TeacherSettingsTable: React.FC<TeacherSettingsTableProps> = ({
  data,
}) => {
  const params = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherData | null>(
    null
  );
  const [permissions, setPermissions] = useState<Permission[]>([]);

  const fetchTeacherPermissions = async (teacherId: string) => {
    try {
      const permissions = await getTeacherPermissions(
        teacherId,
        params.courseId as string
      );
      setPermissions(permissions);
    } catch (error) {
      console.error("Error fetching teacher permissions:", error);
    }
  };

  // Mock function to save permissions for a specific teacher
  const saveTeacherPermissions = async (
    teacherId: string,
    updatedPermissions: Permission[]
  ) => {
    try {
    } catch (error) {
      console.error("Error saving teacher permissions:", error);
    }
  };

  const handlePermissionsClick = (teacher: TeacherData) => {
    setSelectedTeacher(teacher);
    fetchTeacherPermissions(teacher?.id);
    setIsModalOpen(true);
  };

  const handleSavePermissions = () => {
    if (selectedTeacher) {
      // saveTeacherPermissions(selectedTeacher?.id, permissions); // Save updated permissions for the selected teacher
    }
    setIsModalOpen(false);
  };

  const handlePermissionChange = (id: string, checked: boolean) => {
    // setPermissions(permissions.map((perm) =>
    //   perm.id === id ? { ...perm, checked } : perm
    // ));
  };

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="overflow-auto max-h-[480px]">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 sticky top-0" style={{ zIndex: 1 }}>
            <tr>
              <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
                Profile
              </th>
              <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
                Permissions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map(
              (teacher, index) =>
                teacher && (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={teacher.profile_picture}
                        alt={`${teacher.name}'s profile`}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {teacher?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {teacher.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {Roles[teacher.role] || teacher.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="bg-blue-800 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-900"
                        onClick={() => handlePermissionsClick(teacher)}
                      >
                        Permissions
                      </button>
                    </td>
                  </tr>
                )
            )}
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
