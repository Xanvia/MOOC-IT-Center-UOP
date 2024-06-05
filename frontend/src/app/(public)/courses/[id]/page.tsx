import CourseContent from "@/components/Course/CourseCard/CourseHome/CourseContent";
import CourseHeader from "@/components/Course/CourseCard/CourseHome/CourseDescriptionHeader";
import CourseDetails from "@/components/Course/CourseCard/CourseHome/CourseDetails";
import CourseOutcomes from "@/components/Course/CourseCard/CourseHome/CourseOutcomes";
import React from "react";

export default function CoursesHome() {
  return (
    <>
      <CourseHeader />
      <div className="flex justify-center">
        <h1>WelCome To Course</h1>

        <h1>Introuduction to programming</h1>
      </div>
      <CourseDetails />
      <CourseContent />
      <CourseOutcomes />

      {/* map reccomanedd */}
    </>
  );
}
