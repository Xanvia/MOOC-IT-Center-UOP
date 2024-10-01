import React from "react";
import Head from "next/head";
import { Plus } from "lucide-react";
import TeacherTable from "@/components/TeacherTable/TeacherTable";

export interface TeacherData {
  name: string;
  course: string;
  faculty: string;
  department: string;
  status: "Active" | "Inactive";
}

export const teachersData: TeacherData[] = [
  {
    name: "Candice Schiner",
    course: "Introduction to computer network",
    faculty: "Faculty of Science",
    department: "Statistic and Computer Science",
    status: "Active",
  },
  {
    name: "John Doe",
    course: "Material Science",
    faculty: "Faculty of Engineering",
    department: "Civil Engineering",
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
          <button className="flex items-center px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors duration-200">
            <Plus className="w-4 h-4 mr-2" />
            Add New Teacher
          </button>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search name..."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <TeacherTable data={teachersData} />
      </main>
    </div>
  );
};

export default TeachersPage;
