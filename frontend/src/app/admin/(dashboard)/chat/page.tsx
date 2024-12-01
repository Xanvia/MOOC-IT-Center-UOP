"use client";
import React, { useEffect, useState } from "react";

import {
  getAllPublishedCourses,
  getAllUnpublishedCourses,
  publishCourse,
} from "@/services/admin.service";

interface Course {
  id: number;
  course_creator: string;
  name: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

const CoursePage: React.FC = () => {
  

  return (
    <div className="flex h-screen bg-gray-50">
      <main className="flex-1 flex flex-col overflow-hidden p-6 bg-white rounded-lg shadow-md mx-6 my-6">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-4">
          Chat
        </h2>

      </main>
    </div>
  );
};

export default CoursePage;
