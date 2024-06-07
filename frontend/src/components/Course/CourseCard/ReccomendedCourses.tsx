import React from "react";
import CourseCard from "./CourseCard";

const course1 = "/images/course1.png";
const course2 = "/images/course2.png";
const course5 = "/images/course5.png";

const RecommendedCourses: React.FC = () => {
  return (
    <>
      <div className="col-span-2 mx-44 mt-20">
        <h1 className="text-2xl text-primary font-semibold ml-8">
          {" "}
          Course Recommendations For You
        </h1>
        <div className="w-full h-px bg-gray-200 my-4" />
      </div>
      <div className="col-span-2 mx-44 mb-6 pb-20">
        <div className="grid grid-cols-3 gap-2">
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
