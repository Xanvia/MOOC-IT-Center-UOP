"use client";
import React, { useEffect, useState } from "react";
import CourseCard from "@/components/Course/CourseCard/CourseCard";
import { fetchAllCourses } from "@/services/course.service";
import { CourseData } from "@/components/Course/course.types";
import Search from "@/components/Search/Search";

export default function Home() {
  const [courses, setCourses] = useState<CourseData[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetchAllCourses();
        setCourses(response.courses);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <Search />
      <div className="grid grid-cols-1 py-10 ml-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 justify-center items-center mx-10 sm:mx-36 lg:mx-36 gap-4  lg:gap-4 2xl:gap-10">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            image={course.header_image || ""}
            title={course.name}
            description=""
          />
        ))}
      </div>
    </>
  );
}
