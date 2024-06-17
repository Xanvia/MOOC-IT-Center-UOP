"use client";
import React from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import Breadcrumb from "@/components/Course/CourseHome/Breadcrumb";

interface BreadcrumbItem {
  breadcrumb: string;
  href?: string; // Make href optional
}

const breadcrumbs: BreadcrumbItem[] = [
  { breadcrumb: "Home", href: "/" },
  { breadcrumb: "> Courses", href: "/courses" },
  { breadcrumb: "> Basic Web Programming", href: "/courses/1" },
  { breadcrumb: "> Course Room", href: "/courses/1/room" },
];

export default function CoursesRoom() {
    return (
      <>
        <Breadcrumb breadcrumbs={breadcrumbs} />
        <div className="bg-sky-100">
          <Sidebar/>
        </div>
        
      </>
    );
  }









