"use-client";
import type { Metadata } from "next";
import Search from "@/components/Search/Search";
import CourseCard from "@/components/Course/CourseCard/CourseCard";

export const metadata: Metadata = {
  title: "OpenEd | Home",
};



const course1 = "/images/course1.png";
const course2 = "/images/course2.png";
const course3 = "/images/course3.png";
const course6 = "/images/course6.png";
const course5 = "/images/course5.png";

export default function Home() {
  return (
    <>
      <Search />

      <div className="grid grid-cols-1 py-10 ml-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 justify-center items-center mx-10 sm:mx-36 lg:mx-36 gap-4  lg:gap-4 2xl:gap-10">
        <CourseCard
          title="Introduction to Computer Networks "
          description="The learning material on beginner-level website creation."
          image={course1}
        />

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
        <CourseCard
          title="Computer Networks "
          description="The learning material on beginner-level website creation."
          image={course1}
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
        <CourseCard
          title="Computer Networks "
          description="The learning material on beginner-level website creation."
          image={course1}
        />
        <CourseCard
          title="Digital Marketing"
          description="Material on beginner marketing strategies and concepts"
          image={course6}
        />
        <CourseCard
          title="Digital Marketing"
          description="Material on beginner marketing strategies and concepts"
          image={course2}
        />
      </div>
      
    </>
  );
}
