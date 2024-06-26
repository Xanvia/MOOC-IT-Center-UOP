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
import Loader from "@/components/Loarder/Loarder";

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
  const isEdit = true;
  const params = useParams();
  const [courseData, setCourseData] = useState<CourseData | undefined>(
    undefined
  );
  const [reload, setReload] = useState(false);
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
  }, [courseId,reload]);

  const reloadData = () => {
    setReload(!reload);
  };

  if (!courseData) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <CourseHeader courseData={courseData}  reloadData={reloadData} />
      <CourseHStat
        studentsEnrolled={"21.000+"}
        duration={courseData.duration}
        lessons={"30+"}
        activities={"50+"}
        ratings={4.5}
        level={courseData.difficulty}
      />

      <div className="bg-white shadow-sm mt-10">
        <div className="container mx-auto p-8">
          <CourseDetailsTabs isEdit={isEdit} courseData={courseData}  reloadData={reloadData} />
        </div>
      </div>

      <ReccomendedCourses />
    </>
  );
}
