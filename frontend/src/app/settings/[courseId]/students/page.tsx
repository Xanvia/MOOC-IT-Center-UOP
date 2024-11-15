"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import StudentSettingsTable from "@/components/Students/StudentsSettings";
import { getCourseStudents } from "@/services/settings.service";
import { useParams } from "next/navigation";

interface StudentData {
  id: string;
  name: string;
  email: string;
  profile_picture: string;
  progress: number;
}

interface StudentTableProps {
  data: StudentData[];
}

const StudentsPage = () => {
  const [studentsData, setStudentsData] = useState<StudentData[]>([]);
  const params = useParams();
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const teachers = await getCourseStudents(params.courseId as string);
        setStudentsData(teachers);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudents();
  }, []);

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
