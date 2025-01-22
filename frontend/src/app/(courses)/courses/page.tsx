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
import { useGlobal } from "@/contexts/store";

export default function Courses() {
  const { userRole } = useGlobal();
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [reload, setReload] = useState(false);
  const [activeTab, setActiveTab] = useState<"inprogress" | "completed">(
    "inprogress"
  );

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetchMyCourses();
        // Deduplicate courses by ID
        const uniqueCourses = response.courses.reduce(
          (acc: CourseData[], current: CourseData) => {
            if (!acc.some((course) => course.id === current.id)) {
              acc.push(current);
            }
            return acc;
          },
          []
        );
        setCourses(uniqueCourses);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      }
    };

    fetchCourses();
  }, [reload]);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
  ];

  // Filter courses based on the active tab
  const filteredCourses = courses.filter((course) => {
    const progress = course.progress ? Number(course.progress) : 0; // Convert progress to a number
    return activeTab === "inprogress" ? progress < 100 : progress === 100;
  });

  const reloadCourses = () => {
    setReload(!reload);
  };

  return (
    <div className="container mx-auto px-4 mt-20">
      {/* Breadcrumb */}
      <div className="mx-36 mb-4">
        <TheBreadcrumb items={breadcrumbItems} />
      </div>
      <div className="mx-36 flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Courses</h1>
        {userRole === "teacher" && (
          <Suspense>
            <CreateCourseModal relaodCourses={reloadCourses} />
          </Suspense>
        )}
      </div>

      {userRole === "student" && (
        <>
          {/* Tabs */}
          <div className="flex justify-center border-b border-gray-200 mb-8">
            <button
              onClick={() => setActiveTab("inprogress")}
              className={`px-4 py-2 font-medium ${
                activeTab === "inprogress"
                  ? "border-b-2 border-blue-800 text-blue-900"
                  : "text-gray-500"
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`px-4 py-2 font-medium ${
                activeTab === "completed"
                  ? "border-b-2 border-blue-800 text-blue-900"
                  : "text-gray-500"
              }`}
            >
              Completed
            </button>
          </div>

          {/* Filtered Courses */}
          <div className="grid grid-cols-1 py-10 ml-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 justify-center items-center mx-10 sm:mx-36 lg:mx-36 gap-4 lg:gap-4 2xl:gap-10">
            {filteredCourses.map((course) => (
              <Link key={course.id} href={`courses/${course.id}`}>
                <CourseCard
                  id={course.id}
                  institution={course.institution}
                  difficulty={course.difficulty}
                  image={course.header_image || ""}
                  title={course.name}
                  description={course.description}
                  userRole={userRole || ""}
                  progress={course.progress || "0"}
                />
              </Link>
            ))}
          </div>
        </>
      )}

      {userRole === "teacher" && (
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
                userRole={userRole || ""}
                progress={course.progress || "0"}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
