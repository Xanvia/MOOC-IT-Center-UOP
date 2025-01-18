"use client";
import React, { useEffect, useState } from "react";
import CourseCard from "@/components/Course/CourseCard/CourseCard";
import {
  fetchAllCourses,
  fetchAllCategories,
  fetchRecommendedCourses,
} from "@/services/course.service";
import { CourseData, CategoryEnum } from "@/components/Course/course.types";
import Search from "@/components/Search/Search";
import CategoryTabs from "@/components/CategoryTabs/CategoryTabs";
import Slideshow from "@/components/Slideshow/Slideshow";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SectionHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => (
  <div className="relative py-8">
    <div className="flex items-center gap-4">
      <div className="flex-shrink-0">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        {subtitle && (
          <p className="mt-2 text-gray-600 text-sm md:text-base max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
      <div className="flex-grow h-0.5 bg-gradient-to-r from-blue-600 to-transparent"></div>
    </div>
  </div>
);

const Pagination = () => {
  return (
    <div className="flex items-center justify-center space-x-2 py-8">
      <button className="flex items-center px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
        <ChevronLeft className="w-5 h-5" />
        <span className="ml-1"></span>
      </button>

      <div className="flex items-center space-x-1">
        <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">
          1
        </button>
        <button className="px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
          2
        </button>
        <button className="px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
          3
        </button>
        <span className="px-2 text-gray-500">...</span>
        <button className="px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
          10
        </button>
      </div>

      <button className="flex items-center px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">
        <span className="mr-1"></span>
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default function Home() {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [suggestedCourses, setSuggestedCourses] = useState<CourseData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryEnum>(
    CategoryEnum.All
  );

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetchAllCourses();
        setCourses(response.courses);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      }
    };

    const fetchandSetRecommendedCourses = async () => {
      try {
        const response = await fetchRecommendedCourses();
        setSuggestedCourses(response.courses);
      } catch (error) {
        console.error("Failed to fetch recommended courses", error);
      }
    };
    fetchandSetRecommendedCourses();
    fetchCourses();
  }, []);

  const handleCategoryChange = (category: CategoryEnum) => {
    setSelectedCategory(category);
  };

  const CourseGrid = ({ courses }: { courses: CourseData[] }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 gap-6 mb-12">
      {courses.map((course) => (
        <CourseCard
          id={course.id}
          key={course.id}
          image={course.header_image || ""}
          title={course.name}
          description={course.description}
          difficulty={course.difficulty}
          institution={course.institution}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Slideshow />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Search setCourses={setCourses} />
        <CategoryTabs onCategoryChange={handleCategoryChange} />

        {/* Popular Courses Section */}
        <section className="mt-12">
          <SectionHeader
            title="Most Popular Certificates"
            subtitle="Explore our most popular programs, get job-ready for an in-demand career."
          />
          <CourseGrid courses={courses} />
        </section>

        {/* Suggested Courses Section */}
        <section className="mt-12">
          <SectionHeader
            title="Suggested for You"
            subtitle="Personalized course recommendations based on your interests and learning goals."
          />
          <CourseGrid courses={suggestedCourses} />
        </section>
      </div>
      <Pagination />
    </div>
  );
}
