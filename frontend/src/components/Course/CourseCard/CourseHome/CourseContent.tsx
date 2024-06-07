import React from "react";
import CourseContentAccordion from "../CourseHome/CourseContentAccordion";

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
      

    </div>
  </div>
  
  </>;
};

export default CourseContent;
