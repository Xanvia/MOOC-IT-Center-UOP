import React from "react";
import Head from "next/head";
import TeacherSettingsTable from "@/components/TeacherTable/TeacherSettings";

interface TeacherData {
  name: string;
  profilePicture: string; // URL for the profile picture
  headline: string; // Changed from 'course' to match the table header
  institution: string; // Changed from 'faculty' to match the table header
  courses: string; // Changed from 'department' to match the table header
  status: "Active" | "Inactive";
}

const teachersData: TeacherData[] = [
  {
    name: "Candice Schiner",
    profilePicture: "/api/placeholder/40/40", // Using a placeholder, replace with actual URL
    headline: "Computer Network Specialist",
    institution: "University of Technology",
    courses: "Introduction to Computer Networks, Advanced Networking",
    status: "Active",
  },
  {
    name: "John Doe",
    profilePicture: "/api/placeholder/40/40", // Using a placeholder, replace with actual URL
    headline: "Materials Science Professor",
    institution: "Engineering Institute",
    courses: "Material Science, Advanced Materials",
    status: "Active",
  },
];

const TeachersPage = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Head>
        <title>OpenEd - Teacher Management</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-1 flex flex-col overflow-hidden p-6 bg-white rounded-lg shadow-md mx-6 my-6">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Manage Teachers
          </h2>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search name..."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <TeacherSettingsTable
          data={teachersData}
          onPermissionsClick={() => {}}
        />
      </main>
    </div>
  );
};

export default TeachersPage;
