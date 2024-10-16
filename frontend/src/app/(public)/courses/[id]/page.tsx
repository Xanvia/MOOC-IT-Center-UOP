"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import CourseHeader from "@/components/Course/CourseHome/CourseDescriptionHeader";
import CourseHStat from "@/components/Course/CourseHome/CourseHStat";
import ReccomendedCourses from "@/components/Course/CourseCard/ReccomendedCourses";
import CourseDetailsTabs from "@/components/Course/CourseHome/Tabs/CourseDetailsTabs";
import TheBreadcrumb from "@/components/TheBreadcrumb/TheBreadcrumb"; // Import the Breadcrumb component

import { CourseData } from "@/components/Course/course.types";
import { fetchCourseData } from "@/services/course.service";
import Loader from "@/components/Loarder/Loarder";
import { useGlobal } from "@/contexts/store";

interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function CoursesHome() {
  const params = useParams();
  const { userRole } = useGlobal();
  const [courseData, setCourseData] = useState<CourseData | undefined>(undefined);
  const [reload, setReload] = useState(false);
  const [isEdit, setIsEdit] = useState(courseData?.canEdit || false);
  const courseId = params.id;

  useEffect(() => {
    const loadCourseData = async () => {
      if (!courseId) return;
      try {
        const data = await fetchCourseData(courseId as string);
        setCourseData(data);
        setIsEdit(data.canEdit);
      } catch (error) {
        console.error(error);
      }
    };
    loadCourseData();
  }, [courseId, reload]);

  useEffect(() => {
    if (userRole === "teacher") {
      setIsEdit(true);
    } else if (userRole === "student") {
      setIsEdit(false);
    }
  }, [userRole]);

  const reloadData = () => {
    setReload(!reload);
  };

  if (!courseData) {
    return <Loader />;
  }

  // Define breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Courses', href: '/courses' },
    { label: courseData.name, href: `/courses/${courseId}` },
  ];

  return (
    <>
      <div className="container mx-auto px-4 mt-8">
        <TheBreadcrumb items={breadcrumbItems} />
      </div>
      <CourseHeader
        isEdit={isEdit}
        courseData={courseData}
        reloadData={reloadData}
      />
      <CourseHStat
        studentsEnrolled={"21.000+"}
        duration={courseData.duration || ""}
        lessons={"30+"}
        activities={"50+"}
        ratings={4.5}
        level={courseData.difficulty}
      />
      <div className="bg-white shadow-sm mt-10">
        <div className="container mx-auto p-8">
          <CourseDetailsTabs
            isEdit={isEdit}
            courseData={courseData}
            reloadData={reloadData}
          />
        </div>
      </div>
      <ReccomendedCourses />
    </>
  );
}