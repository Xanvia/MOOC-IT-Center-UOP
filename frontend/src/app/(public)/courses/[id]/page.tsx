"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import CourseHeader from "@/components/Course/CourseHome/CourseDescriptionHeader";
import CourseHStat from "@/components/Course/CourseHome/CourseHStat";
import ReccomendedCourses from "@/components/Course/CourseCard/ReccomendedCourses";
import CourseDetailsTabs from "@/components/Course/CourseHome/Tabs/CourseDetailsTabs";
import Breadcrumb from "@/components/Course/CourseHome/Breadcrumb";
import { CourseData } from "@/components/Course/course.types";
import { fetchCourseData } from "@/services/course.service";

interface BreadcrumbItem {
  breadcrumb: string;
  href?: string;
}

const breadcrumbs: BreadcrumbItem[] = [
  { breadcrumb: "Home", href: "/" },
  { breadcrumb: "> Courses", href: "/courses" },
  { breadcrumb: "> Basic Web Programming", href: "/courses/1" },
];

export default function CoursesHome() {
  const params = useParams();
  const [courseData, setCourseData] = useState<CourseData | undefined>(
    undefined
  );
  const courseId = params.id;

  useEffect(() => {
    const loadCourseData = async () => {
      if (!courseId) return;
      try {
        const data = await fetchCourseData(courseId as string);
        setCourseData(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadCourseData();
  }, [courseId]);

  return (
    <>
      {courseData && (
        <>
          <Breadcrumb breadcrumbs={breadcrumbs} />
          <CourseHeader
            courseTitle={courseData.name}
            institutionName={courseData.institution}
            instructorName={courseData.course_creator.full_name}
            instructorDetails={courseData.course_creator.headline}
          />
          <CourseHStat />

          <div className="bg-white shadow-sm mt-10">
            <div className="container mx-auto p-8">
              <CourseDetailsTabs />
            </div>
          </div>

          <ReccomendedCourses />
        </>
      )}
    </>
  );
}
