"use client";
import React, { lazy, useState } from "react";
import { CourseData } from "../../course.types";

const CourseTable = lazy(() => import("@/components/CourseTable/CourseTable"));
const PublishToggle = lazy(() => import("@/components/Buttons/ToggleButton"));

interface PublishPageProps {
  courseData: CourseData[];
  reloadData: () => void;
}

const PublishPage = ({ courseData, reloadData }: PublishPageProps) => {
  const [courses, setCourses] = useState<CourseData[]>(
    courseData.filter((course) => course.publish) // Filter for published courses
  );

  const handlePublishToggle = (course: CourseData) => {
    const updatedCourses = courses.map((c) =>
      c.courseName === course.courseName ? { ...c, publish: false } : c
    );
    setCourses(updatedCourses);
    reloadData();
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Published Courses</h2>
      <CourseTable
        data={courses}
        onPublishClick={handlePublishToggle}
      />
    </div>
  );
};

export default PublishPage;
