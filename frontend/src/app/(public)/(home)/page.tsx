"use client";
import React, { useEffect, useState } from "react";
import CourseCard from "@/components/Course/CourseCard/CourseCard";
import { fetchAllCourses } from "@/services/course.service";
import { CourseData, CategoryEnum } from "@/components/Course/course.types";
import Search from "@/components/Search/Search";
import CategoryTabs from "@/components/CategoryTabs/CategoryTabs";

export default function Home() {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<CourseData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryEnum>(CategoryEnum.All);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetchAllCourses();
        setCourses(response.courses);
        setFilteredCourses(response.courses);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      }
    };
    fetchCourses();
  }, []);

  const handleCategoryChange = (category: CategoryEnum) => {
    setSelectedCategory(category);
    if (category === CategoryEnum.All) {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter((course) => course.category.id === category);
      setFilteredCourses(filtered);
    }
  };

  return (
    <>
      <div className="text-black text-3xl font-bold font-serif mt-14 text-center flex justify-center items-center">
        <h1>"Empowering Minds with Knowledge: Your Journey to Success Starts Here."</h1>
      </div>
      <Search />
      <CategoryTabs onCategoryChange={handleCategoryChange} />
      <div className="grid grid-cols-1 py-10 ml-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 justify-center items-center mx-10 sm:mx-36 lg:mx-36 gap-4 lg:gap-4 2xl:gap-10">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            image={course.header_image || ""}
            title={course.name}
            description={course.description}
          />
        ))}
      </div>
    </>
  );
}