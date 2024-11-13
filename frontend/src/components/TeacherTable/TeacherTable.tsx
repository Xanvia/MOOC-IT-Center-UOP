import React from "react";
import Image from "next/image";

export interface TeacherData {
  first_name: string;
  last_name: string;
  email: string;
  profile_picture: string;
  institution: string;
  courses_count: number;
}

export interface TeacherTableProps {
  data: TeacherData[];
}

const TeacherTable = ({ data }: TeacherTableProps) => {
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
                Email
              </th>
              <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
                Institution
              </th>
              <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
                Active Courses
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((teacher, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Image
                    src={teacher.profile_picture}
                    alt={`${teacher.first_name}'s profile`}
                    className="h-10 w-10 rounded-full object-cover"
                    width={40}
                    height={40}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {teacher.first_name} {teacher.last_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{teacher.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {teacher.institution}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {teacher.courses_count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherTable;
