"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import TeacherSettingsTable from "@/components/TeacherTable/TeacherSettings";
import AddTeachersModal from "@/components/TeacherTable/AddTeachersModal";
import { getAllCourseTeachers } from "@/services/settings.service";
import { useParams } from "next/navigation";

interface TeacherData {
  id: string;
  name: string;
  profile_picture: string;
  email: string;
  role: keyof typeof Roles;
}

interface CourseData {
  id: string;
  name: string; // Add other fields as needed
}

const Roles = {
  "non-editing_teacher": "Non-Editing Teacher",
  editing_teacher: "Editing Teacher",
  teacher: "Teacher",
};

const TeachersPage = () => {
  const params = useParams();
  const [teachersData, setTeachersData] = useState<TeacherData[]>([]);
  const [courseData, setCourseData] = useState<CourseData | null>(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const teachers = await getAllCourseTeachers(params.courseId as string);
        setTeachersData(teachers);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };
  
    const fetchCourseData = async () => {
      try {
        // Ensure the course ID is a string
        const courseId = Array.isArray(params.courseId)
          ? params.courseId[0]
          : params.courseId;
  
        // Replace with actual course fetching logic
        const course = { id: courseId, name: "Sample Course" }; // Mock data
        setCourseData(course);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };
  
    fetchTeachers();
    fetchCourseData();
  }, [params.courseId]);

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
        {courseData && (
          <TeacherSettingsTable data={teachersData} course={courseData} />
        )}
      </main>
    </div>
  );
};

export default TeachersPage;
