"use client";
import React, { useEffect, useState } from "react";
import ToggleButton from "@/components/Buttons/ToggleButton";
import CourseTable from "@/components/CourseTable/CourseTable";
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
  const [publishedCourses, setPublishedCourses] = useState<Course[]>([]);

  const [unpublishedCourses, setUnpublishedCourses] = useState<Course[]>([]);

  const [isPublished, setIsPublished] = useState(false);

  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  const handleToggle = (status: boolean) => {
    setIsPublished(status);
    setSearchTerm(""); // Clear search input when toggling views
  };

  const handlePublish = async (courseId: number) => {
    try {
      await publishCourse(courseId);
      setPublishedCourses(
        publishedCourses.concat(
          unpublishedCourses.filter((course) => course.id === courseId)
        )
      );
      setUnpublishedCourses(
        unpublishedCourses.filter((course) => course.id !== courseId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchPublishedCourses = async () => {
      try {
        const courses = await getAllPublishedCourses();
        setPublishedCourses(courses);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchUnPublishedCourses = async () => {
      try {
        const courses = await getAllUnpublishedCourses();
        setUnpublishedCourses(courses);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPublishedCourses();
    fetchUnPublishedCourses();
  }, []);

  // Filter courses dynamically based on the search term
  const filteredCourses = (isPublished ? publishedCourses : unpublishedCourses).filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <main className="flex-1 flex flex-col overflow-hidden p-6 bg-white rounded-lg shadow-md mx-6 my-6">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-4">
          Manage Courses
        </h2>
        <div>
          <ToggleButton onToggle={handleToggle} />
        </div>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm} // Bind input value to searchTerm state
            onChange={(e) => setSearchTerm(e.target.value)} // Update state on input change
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {isPublished ? (
          <CourseTable
            courses={filteredCourses}
            isPublished={true}
            onPublish={handlePublish}
          />
        ) : (
          <CourseTable
            courses={filteredCourses} // Pass filtered courses to the table
            isPublished={false}
            onPublish={handlePublish}
          />
        )}
      </main>
    </div>
  );
};

export default CoursePage;
