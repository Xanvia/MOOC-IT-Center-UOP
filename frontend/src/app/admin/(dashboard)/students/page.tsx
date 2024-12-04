"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import StudentTable from "@/components/Students/StudentTable";
import { getAllStudents } from "@/services/admin.service";

interface StudentData {
  first_name: string;
  last_name: string;
  email: string;
  profile_picture: string;
}

interface StudentTableProps {
  data: StudentData[];
}

const StudentsPage = () => {
  const [studentsData, setStudentsData] = useState<StudentData[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const students = await getAllStudents();
        setStudentsData(students);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudents();
  }, []);

   // Filter students based on the search term
   const filteredStudents = studentsData.filter((student) =>
    `${student.first_name} ${student.last_name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Head>
        <title>OpenEd - Students</title>
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
            value={searchTerm} // Bind input value to searchTerm state
            onChange={(e) => setSearchTerm(e.target.value)} // Update state on input change          
          />
        </div>

        <StudentTable data={filteredStudents} />
      </main>
    </div>
  );
};

export default StudentsPage;
