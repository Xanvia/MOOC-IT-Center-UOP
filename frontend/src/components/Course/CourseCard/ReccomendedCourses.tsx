import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { fetchRecommendedCourses } from "@/services/course.service";
import { CourseData } from "@/components/Course/course.types";
import Link from "next/link";

const RecommendedCourses: React.FC = () => {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetchRecommendedCourses();
        setCourses(response.courses);
      } catch (error) {
        console.error("Failed to fetch recommended courses", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading recommended courses...</p>;
  }

  if (courses.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">
        No recommended courses available.
      </p>
    );
  }

  return (
    <>
      <div className="col-span-2 mx-44 mt-20">
        <h1 className="text-2xl text-primary font-semibold mx-44">
          Course Recommendations For You
        </h1>
        <div className="w-full h-px bg-gray-200 my-4" />
      </div>
      <div className="container mx-auto px-4 mt-10">
        <div className="grid grid-cols-1 py-10 ml-12 sm:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 justify-center items-center mx-10 sm:mx-36 lg:mx-36 gap-4 lg:gap-4 2xl:gap-10">
          {courses.map((course) => (
            <Link key={course.id} href={`/courses/${course.id}`}>
              <CourseCard
                id={course.id}
                title={course.name}
                description={course.description}
                difficulty={course.difficulty}
                institution={course.institution}
                image={course.header_image || ""}
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default RecommendedCourses;
