import React from "react";
import Image from "next/image";

export interface TeacherData {
  name: string;
  profilePicture: string;
  headline: string;
  institution: string;
  status: "Active" | "Inactive";
}

export interface TeacherSettingsTableProps {
  data: TeacherData[];
  onPermissionsClick: (teacher: TeacherData) => void; // New prop to handle button click
}

const TeacherSettingsTable = ({
  data,
  onPermissionsClick,
}: TeacherSettingsTableProps) => {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="overflow-auto max-h-[480px]">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
                Profile
              </th>
              <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
                Headline
              </th>
              <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
                Institution
              </th>
              <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
                Permissions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((teacher, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Image
                    src={teacher.profilePicture}
                    alt={`${teacher.name}'s profile`}
                    className="h-10 w-10 rounded-full object-cover"
                    width={40}
                    height={40}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{teacher.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {teacher.headline}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {teacher.institution}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600">
                    Permissions
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherSettingsTable;
