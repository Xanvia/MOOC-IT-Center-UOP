'use client';

import React, { useState } from "react";
import CourseTable from "@/components/CourseTable/CourseTable";
import PublishToggle from "@/components/Buttons/ToggleButton";

interface CourseData {
  courseName: string;
  profilePicture: string;
  courseCreater: string;
  publish: string; 
  level: "Beginner" | "Intermediate" | "Advanced";
}

const courseData: CourseData[] = [
  {
    courseCreater: "Candice Schiner",
    profilePicture: "/api/placeholder/40/40",
    courseName: "Computer Network",
    publish: " ",
    level: "Beginner",
  },
  {
    courseCreater: "John Doe",
    profilePicture: "/api/placeholder/40/40",
    courseName: "Materials Science",
    publish: " ",
    level: "Intermediate",
  },
  {
    courseCreater: "Candice Schiner",
    profilePicture: "/api/placeholder/40/40",
    courseName: "Computer Network",
    publish: " ",
    level: "Advanced",
  },
];

const CoursesPage: React.FC = () => {
  const [isPublished, setIsPublished] = useState<boolean>(true);

  const handlePublishToggle = (course: CourseData) => {
    // Implement publish logic here
    console.log(`Toggled publish for ${course.courseName}`);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <main className="flex-1 flex flex-col overflow-hidden p-6 bg-white rounded-lg shadow-md mx-6 my-6">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Manage Courses
          </h2>
        </div>
        <div className="">
          <PublishToggle />
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
          onPublishClick={handlePublishToggle}
        />
      </main>
    </div>
  );
};

export default CoursesPage;