import React from "react";
import Head from "next/head";
import { Plus } from "lucide-react";
import StudentTable from "@/components/Students/StudentTable";
import StudentSettingsTable from "@/components/Students/StudentsSettings";

export interface StudentData {
  name: string;
  profilePicture: string;
  course: string; // What they're studying
  year: string; // Year of study
  grades: string; // Current grades or academic standing
  status: "Active" | "Alumni" | "On Leave";
}

export interface StudentTableProps {
  data: StudentData[];
}

export const studentsData: StudentData[] = [
  {
    name: "Emma Thompson",
    profilePicture: "/api/placeholder/40/40",
    course: "Computer Science",
    year: "3rd Year",
    grades: "A Average",
    status: "Active",
  },
  {
    name: "Marcus Johnson",
    profilePicture: "/api/placeholder/40/40",
    course: "Mechanical Engineering",
    year: "4th Year",
    grades: "B+ Average",
    status: "Active",
  },
  {
    name: "Sophia Chen",
    profilePicture: "/api/placeholder/40/40",
    course: "Business Administration",
    year: "Graduate",
    grades: "A- Average",
    status: "Alumni",
  },
  {
    name: "Lucas Patel",
    profilePicture: "/api/placeholder/40/40",
    course: "Psychology",
    year: "2nd Year",
    grades: "B Average",
    status: "On Leave",
  },
  {
    name: "Isabella Kim",
    profilePicture: "/api/placeholder/40/40",
    course: "Biology",
    year: "1st Year",
    grades: "A- Average",
    status: "Active",
  },
  {
    name: "Mohammed Al-Sayed",
    profilePicture: "/api/placeholder/40/40",
    course: "Architecture",
    year: "3rd Year",
    grades: "B+ Average",
    status: "Active",
  },
  {
    name: "Sarah O'Connor",
    profilePicture: "/api/placeholder/40/40",
    course: "English Literature",
    year: "Graduate",
    grades: "A Average",
    status: "Alumni",
  },
  {
    name: "David Zhang",
    profilePicture: "/api/placeholder/40/40",
    course: "Physics",
    year: "4th Year",
    grades: "A+ Average",
    status: "Active",
  },
  {
    name: "Anna Kowalski",
    profilePicture: "/api/placeholder/40/40",
    course: "Chemistry",
    year: "2nd Year",
    grades: "B Average",
    status: "Active",
  },
  {
    name: "James Wilson",
    profilePicture: "/api/placeholder/40/40",
    course: "History",
    year: "3rd Year",
    grades: "B- Average",
    status: "On Leave",
  },
];
const StudentsPage = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Head>
        <title>OpenEd - Teacher Management</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-1 flex flex-col overflow-hidden p-6 bg-white rounded-lg shadow-md mx-6 my-6">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Manage Students
          </h2>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search name..."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <StudentSettingsTable
          data={studentsData}
          onManageGradeClick={() => {}}
        />
      </main>
    </div>
  );
};

export default StudentsPage;
