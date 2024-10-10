
import React from "react";
import Head from "next/head";
import { Plus } from "lucide-react";
import CourseTable from "@/components/CourseTable/CourseTable";

interface CourseData {
  courseName: string;
  profilePicture: string;
  courseCreater: string;
  subscription: string; 
  level: "Active" | "Intermediate" | "Advanced";
}

const courseData: CourseData[] = [
  {
    courseCreater: "Candice Schiner",
    profilePicture: "/api/placeholder/40/40", // Using a placeholder, replace with actual URL
    courseName: "Computer Network",
    courses: "Introduction to Computer Networks, Advanced Networking",
    level: "Beginner",
  },
  {
    courseCreater: "John Doe",
    profilePicture: "/api/placeholder/40/40", // Using a placeholder, replace with actual URL
    courseName: "Materials Science",
    courses: "Material Science, Advanced Materials",
    level: "Intermediate",
  },
  {
    courseCreater: "Candice Schiner",
    profilePicture: "/api/placeholder/40/40", // Using a placeholder, replace with actual URL
    courseName: "Computer Network",
    courses: "Introduction to Computer Networks, Advanced Networking",
    level: "Advanced",
  },

];


const CoursesPage = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Head>
        <title>OpenEd - Teacher Management</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-1 flex flex-col overflow-hidden p-6 bg-white rounded-lg shadow-md mx-6 my-6">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Manage Courses
          </h2>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search name..."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <CourseTable
          data={courseData}
          onSubscribeClick={(courseId: string) => {
            // Handle permissions click event here
          }}
        />

      </main>
    </div>
  );
};

export default CoursesPage;
