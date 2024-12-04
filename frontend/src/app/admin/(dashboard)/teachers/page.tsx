"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Plus } from "lucide-react";
import TeacherTable from "@/components/TeacherTable/TeacherTable";
import { getAllTeachers } from "@/services/admin.service";

interface TeacherData {
  first_name: string;
  last_name: string;
  email: string;
  profile_picture: string;
  courses_count: number;
  institution: string;
}

const TeachersPage = () => {
  const [teachersData, setTeachersData] = useState<TeacherData[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const teachers = await getAllTeachers();
        setTeachersData(teachers);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTeachers();
  }, []);

   // Filter teachers dynamically based on the search term
   const filteredTeachers = teachersData.filter((teacher) =>
    `${teacher.first_name} ${teacher.last_name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );


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
            value={searchTerm} // Bind input value to searchTerm state
            onChange={(e) => setSearchTerm(e.target.value)} // Update state on input change
           
          />
        </div>

        <TeacherTable data={filteredTeachers} />
      </main>
    </div>
  );
};

export default TeachersPage;
