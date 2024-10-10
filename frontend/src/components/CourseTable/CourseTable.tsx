import React from "react";
import Image from "next/image";

interface CourseData {
  courseName: string;
  profilePicture: string;
  courseCreater: string;
  subscription: string; 
  level: "Beginner" | "Intermediate" | "Advanced";
}

interface CourseTableProps {
  data: CourseData[];
  onSubscribeClick: (course: CourseData) => void; // New prop to handle button click
}

const CourseTable = ({
  data,
  onSubscribeClick,
}: CourseTableProps) => {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="overflow-auto max-h-[480px]">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
                PROFILE
              </th>
              <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
                COURSE CREATER
              </th>
              <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
                COURSE
              </th>
              <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
                LEVEL
              </th>
              <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">
                SUBSCRIPTION
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((Course, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Image
                    width={40}
                    height={40}
                    src={Course.profilePicture}
                    alt={`${Course.courseName}'s profile`}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{Course.courseCreater}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {Course.courseName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        Course.level === "Beginner"
                        ? "bg-yellow-100 text-yellow-800"
                        : Course.level === "Intermediate"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {Course.level}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600">
                    Subscribe
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

export default CourseTable;
