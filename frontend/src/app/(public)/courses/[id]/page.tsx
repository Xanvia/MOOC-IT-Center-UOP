"use client";
import React, { useState, useEffect } from "react";
import CourseHeader from "@/components/Course/CourseHome/CourseDescriptionHeader";
import CourseHStat from "@/components/Course/CourseHome/CourseHStat";
import ReccomendedCourses from "@/components/Course/CourseCard/ReccomendedCourses";
import CourseDetailsTabs from "@/components/Course/CourseHome/Tabs/CourseDetailsTabs";
import Breadcrumb from "@/components/Course/CourseHome/Breadcrumb";
import { CourseData } from "@/components/Course/course.types";
import { fetchCourseData } from "@/services/course.service";
import { deflate } from "zlib";

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

  const [courseData, setCourseData] = useState<CourseData[]>([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const loadCourseData = async () => {
      try {
        const data = await fetchCourseData();
        setCourseData(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadCourseData();
  }, [reload]);

  const reloadData = () => {
    setReload((prevState) => !prevState);
  };

  
  return (
    <>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <CourseHeader courseTitle="Prof. Namal Balasooriya"
        institutionName="Prof. Namal Balasooriya"
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
};


