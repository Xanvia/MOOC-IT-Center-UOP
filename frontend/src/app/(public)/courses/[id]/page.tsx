import CourseHeader from "@/components/Course/CourseHome/CourseDescriptionHeader";
import CourseHStat from "@/components/Course/CourseHome/CourseHStat";
import ReccomendedCourses from "@/components/Course/CourseCard/ReccomendedCourses";
import CourseDetailsTabs from "@/components/Course/CourseHome/Tabs/CourseDetailsTabs";
import Breadcrumb from "@/components/Course/CourseHome/Breadcrumb";
import React from "react";

interface BreadcrumbItem {
  breadcrumb: string;
  href?: string; // Make href optional
}

const breadcrumbs: BreadcrumbItem[] = [
  { breadcrumb: "Home", href: "/" },
  { breadcrumb: "> Courses", href: "/courses" },
  { breadcrumb: "> Basic Web Programming", href: "/courses/1" },
];

export default function CoursesHome() {
  return (
    <>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <CourseHeader courseTitle="Basic Web Development"
        institutionName="Imperiel Institute"
        instructorName="Prof. Namal Balasooriya"
        instructorDetails="A few details about the instructor"/>
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
