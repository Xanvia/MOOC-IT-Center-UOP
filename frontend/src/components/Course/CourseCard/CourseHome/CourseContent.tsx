import React from "react";
import CourseContentAccordion from "../CourseHome/CourseContentAccordion";
import CourseCard from "@/components/Course/CourseCard/CourseCard";

const course1 = "/images/course1.png";
const course2 = "/images/course2.png";
const course5 = "/images/course5.png";

const CourseContent: React.FC = () => {
  return <>
  <div className="">
    <div className="grid grid-cols-2 gap-2 m-20 center">
      <div>
        <h1 className="text-3xl text-center font-bold text-primary">Course Content</h1>
      </div>
      <div className="mr-56">
        <CourseContentAccordion/>
      </div>
      <div className="col-span-2 flex border-b justify-between md:flex-row md:items-center p-10 mx-44 my-20 bg-blue-100  shadow-sm">
        <span>
        <h1 className="text-2xl text-primary font-semibold mt-4 ml-4">Benifits of Learning This Course</h1>
        
        <ul className="mt-10 ml-20 text-primary list-none list-inside space-y-2">
            <li>+ The ins and outs of HTML5, CSS3, and Modern JavaScript for 2021</li>
            <li>+  Use CSS Frameworks including Bootstrap 5, Semantic UI, and Bulma</li>
            <li>+  Write Javascript functions, and understand scope and higher order functions</li>
            <li>+  Use Express and MongoDB to create full-stack JS applications</li>
            <li>+  Make REAL web applications using cutting-edge technologies</li>
          </ul>
        </span>
      </div>
      <div className="col-span-2 mx-44 mt-6">
        <h1 className= "text-2xl text-primary font-semibold ml-8"> Course Recommendations For You</h1>
        <div className="w-full h-px bg-gray-200 my-4" />
      </div>
      <div className= "col-span-2 mx-44 mt-6">
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


    </div>
  </div>
  
  </>;
};

export default CourseContent;
