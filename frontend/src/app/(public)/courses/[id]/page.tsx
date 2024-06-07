import CourseContent from "@/components/Course/CourseCard/CourseHome/CourseContent";
import CourseHeader from "@/components/Course/CourseCard/CourseHome/CourseDescriptionHeader";
import CourseOutcomes from "@/components/Course/CourseCard/CourseHome/CourseOutcomes";
import CourseHStat from "@/components/Course/CourseCard/CourseHome/CourseHStat";
import ReccomendedCourses from "@/components/Course/CourseCard/ReccomendedCourses";
import CourseDetailsTabs from "@/components/Course/CourseCard/CourseHome/Tabs/CourseDetailsTabs";
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
