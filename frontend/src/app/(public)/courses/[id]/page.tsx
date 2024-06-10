import CourseContent from "@/components/Course/CourseHome/CourseContent";
import CourseHeader from "@/components/Course/CourseHome/CourseDescriptionHeader";
import CourseOutcomes from "@/components/Course/CourseHome/CourseOutcomes";
import CourseHStat from "@/components/Course/CourseHome/CourseHStat";
import ReccomendedCourses from "@/components/Course/CourseCard/ReccomendedCourses";
import CourseDetailsTabs from "@/components/Course/CourseHome/Tabs/CourseDetailsTabs";
import React from "react";

export default function CoursesHome() {
  return (
    <>
      <CourseHeader />
      <CourseHStat />

      <div className="bg-white shadow-sm mt-10">
        <div className="container mx-auto p-8">
          <CourseDetailsTabs />
        </div>
      </div>

      <ReccomendedCourses />
    </>
  );
}
