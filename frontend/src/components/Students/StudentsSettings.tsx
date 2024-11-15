import React from "react";
import Image from "next/image";
import Link from "next/link";

interface StudentData {
  id: string;
  name: string;
  email: string;
  profile_picture: string;
  progress: number;
}

interface StudentSettingsTableProps {
  data: StudentData[];
  onManageGradeClick: (student: StudentData) => void; // New prop to handle button click
}

const StudentSettingsTable = ({
  data,
  onManageGradeClick,
}: StudentSettingsTableProps) => {
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
                Progress
              </th>
              <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
                Manage Grade
              </th>
              {/* <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th> */}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((student, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Image
                    width={40}
                    height={40}
                    src={student.profile_picture}
                    alt={`${student.name}'s profile`}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.email}</td>
                <td className="px-12 py-4 whitespace-nowrap">
                  {student.progress} %
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link href={`students/quizzes/${student.id}/`}>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600">
                      Manage Grade
                    </button>
                  </Link>
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      student.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : student.status === "Alumni"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {student.status}
                  </span>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentSettingsTable;
