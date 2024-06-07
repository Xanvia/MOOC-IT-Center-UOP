import React from "react";
import CourseCard from "./CourseCard";

const course1 = "/images/course1.png";
const course2 = "/images/course2.png";
const course5 = "/images/course5.png";

const RecommendedCourses: React.FC = () => {
  return (
    <>
      <div className="col-span-2 mx-44 mt-20">
        <h1 className="text-2xl text-primary font-semibold mx-44">
          {" "}
          Course Recommendations For You
        </h1>
        <div className="w-full h-px bg-gray-200 my-4" />
      </div>
      <div className="container mx-auto px-4 mt-10">
        <div className="grid grid-cols-1 py-10 ml-12 sm:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 justify-center items-center mx-10 sm:mx-36 lg:mx-36 gap-4 lg:gap-4 2xl:gap-10">
          <CourseCard
            title="Digital Marketing"
            description="Material on beginner marketing strategies and concepts"
            image={course1}
          />
          <CourseCard
            title="Data Analysis"
            description="Description 3"
            image={course2}
          />
          <CourseCard
            title="Digital Marketing"
            description="Material on beginner marketing strategies and concepts"
            image={course5}
          />
        
        </div>
      </div>
    </>
  );
};

export default RecommendedCourses;
