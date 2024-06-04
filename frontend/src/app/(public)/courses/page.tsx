"use client";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import CourseCard from "@/components/Course/CourseCard/CourseCard";
import Breadcrumb from "@/components/Course/CourseCard/CourseHome/Breadcrumb";

import React from "react";

const course2 = "/images/course2.png";
const course3 = "/images/course3.png";
const course5 = "/images/course5.png";

interface BreadcrumbItem {
  breadcrumb: string;
  href?: string; // Make href optional
}

const breadcrumbs: BreadcrumbItem[] = [
  { breadcrumb: 'Home', href: '/' },
  { breadcrumb: '> Courses', href: '/courses' },
];

export default function Courses() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Breadcrumb breadcrumbs={breadcrumbs}/>
      
      <div className="container mx-auto px-4 mt-20">
        <div className="mx-36 flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Courses</h1>
          <CreateCourseModal />
        </div>

        <div className="grid grid-cols-1 py-10 ml-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 justify-center items-center mx-10 sm:mx-36 lg:mx-36 gap-4 lg:gap-4 2xl:gap-10">
          <CourseCard
            title="Digital Marketing"
            description="Material on beginner marketing strategies and concepts"
            image={course2}
          />
          <CourseCard
            title="Data Analysis"
            description="Description 3"
            image={course3}
          />
          <CourseCard
            title="Digital Marketing"
            description="Material on beginner marketing strategies and concepts"
            image={course5}
          />
          <CourseCard
            title="Digital Marketing"
            description="Material on beginner marketing strategies and concepts"
            image={course2}
          />
        </div>
      </div>
    </>
  );
}
