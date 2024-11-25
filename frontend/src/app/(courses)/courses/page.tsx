"use client";
import React, { useState, Suspense, useEffect } from "react";
import CourseCard from "@/components/Course/CourseCard/CourseCard";
import TheBreadcrumb from "@/components/TheBreadcrumb/TheBreadcrumb";
const CreateCourseModal = React.lazy(
  () => import("@/components/Course/CreateCourseModal/CreateCourseModal")
);
import { CourseData } from "@/components/Course/course.types";
import { fetchMyCourses } from "@/services/course.service";
import Link from "next/link";
import { useGlobal } from "@/contexts/store"; // Assuming useGlobal is in this file

export default function Courses() {
  const { userRole } = useGlobal(); // Get user role from global context
  const [courses, setCourses] = useState<CourseData[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetchMyCourses();
        setCourses(response.courses);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      }
    };

    fetchCourses();
  }, []);

  // Define breadcrumb items
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
  ];

  return (
    <>
      <div className="container mx-auto px-4 mt-20">
        {/* Breadcrumb */}
        <div className="mx-36 mb-4">
          <TheBreadcrumb items={breadcrumbItems} />
        </div>
        <div className="mx-36 flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Courses</h1>
          {userRole === "teacher" && (
            <Suspense>
              <CreateCourseModal /> {/* Render the modal component */}
            </Suspense>
          )}
        </div>
        <div className="grid grid-cols-1 py-10 ml-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 justify-center items-center mx-10 sm:mx-36 lg:mx-36 gap-4 lg:gap-4 2xl:gap-10">
          {courses.map((course) => (
            <Link key={course.id} href={`courses/${course.id}`}>
              <CourseCard
                id={course.id}
                institution={course.institution}
                difficulty={course.difficulty}
                image={course.header_image || ""}
                title={course.name}
                description={course.description}
                userRole={userRole || ""} // Pass the userRole as a prop
                progress={course.progress || "0"}
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
