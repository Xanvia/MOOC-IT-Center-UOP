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
        <CourseContentAccordion/></div>
    </div>
  </div>
  
  </>;
};

export default CourseContent;
