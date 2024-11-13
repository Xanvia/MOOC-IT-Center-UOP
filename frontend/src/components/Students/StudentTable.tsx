import React from "react";
import Image from "next/image";

interface Student {
  first_name: string;
  last_name: string;
  email: string;
  profile_picture: string;
}

interface StudentTableProps {
  data: Student[];
}

const StudentTable = ({ data }: StudentTableProps) => {
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
                First Name
              </th>
              <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
                Last Name
              </th>
              <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              {/* <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
                Grades
              </th>
              <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
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
                    alt={`${student.first_name}'s profile`}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {student.first_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {student.last_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{student.email}</td>
                {/* <td className="px-6 py-4 whitespace-nowrap">
                  {student.grades}
                </td> */}
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

export default StudentTable;
