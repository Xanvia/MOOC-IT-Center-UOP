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

  const handleToggle = (status: boolean) => {
    setIsPublished(status);
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

  return (
    <div className="flex h-screen bg-gray-50">
      <main className="flex-1 flex flex-col overflow-hidden p-6 bg-white rounded-lg shadow-md mx-6 my-6">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-4">
          Manage Courses
        </h2>
        <div>
          <ToggleButton onToggle={handleToggle} />
        </div>
        {isPublished ? (
          <CourseTable
            courses={publishedCourses}
            isPublished={true}
            onPublish={handlePublish}
          />
        ) : (
          <CourseTable
            courses={unpublishedCourses}
            isPublished={false}
            onPublish={handlePublish}
          />
        )}
      </main>
    </div>
  );
};

export default CoursePage;
