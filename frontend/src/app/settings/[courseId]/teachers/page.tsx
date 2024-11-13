"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import TeacherSettingsTable from "@/components/TeacherTable/TeacherSettings";
import AddTeachersModal from "@/components/TeacherTable/AddTeachersModal";
import { getAllCourseTeachers } from "@/services/settings.service";
import { useParams } from "next/navigation";

interface TeacherData {
  name: string;
  profile_picture: string;
  email: string;
  role: keyof typeof Roles;
}

const Roles = {
  "non-editing_teacher": "Non-Editing Teacher",
  editing_teacher: "Editing Teacher",
  teacher: "Teacher",
};

const TeachersPage = () => {
  const params = useParams();
  const [teachersData, setTeachersData] = useState<TeacherData[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const teachers = await getAllCourseTeachers(params.courseId as string);
        console.log(teachers);
        setTeachersData(teachers);
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
            Manage Teachers
          </h2>
          <AddTeachersModal />
        </div>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search name..."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <TeacherSettingsTable data={teachersData} />
      </main>
    </div>
  );
};

export default TeachersPage;
