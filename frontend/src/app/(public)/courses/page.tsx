"use client";
import React, { useState, Suspense, useEffect } from "react";
import CourseCard from "@/components/Course/CourseCard/CourseCard";
import Breadcrumb from "@/components/Course/CourseHome/Breadcrumb";
const CreateCourseModal = React.lazy(
  () => import("@/components/Course/CreateCourseModal/CreateCourseModal")
);
import { CourseData } from "@/components/Course/course.types";
import { fetchMyCourses } from "@/services/course.service";
import Link from "next/link";

const course2 = "/images/course2.png";
const course3 = "/images/course3.png";
const course5 = "/images/course5.png";

interface BreadcrumbItem {
  breadcrumb: string;
  href?: string; // Make href optional
}

const breadcrumbs: BreadcrumbItem[] = [
  { breadcrumb: "Home", href: "/" },
  { breadcrumb: "> Courses", href: "/courses" },
];

export default function Courses() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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

  return (
    <>
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <div className="container mx-auto px-4 mt-20">
        <div className="mx-36 flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Courses</h1>
          <Suspense>
            <CreateCourseModal />
          </Suspense>
        </div>

        <div className="grid grid-cols-1 py-10 ml-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 justify-center items-center mx-10 sm:mx-36 lg:mx-36 gap-4 lg:gap-4 2xl:gap-10">
          {courses.map((course) => (
            <Link key={course.id} href={`courses/${course.id}`}>
              <CourseCard
                image={course.header_image || ""}
                title={course.name}
                description={course.description}
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
