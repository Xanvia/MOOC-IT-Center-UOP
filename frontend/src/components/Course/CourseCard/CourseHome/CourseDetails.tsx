import React from "react";

const CourseDetails: React.FC = () => {
  return (
    <>  
    <div className="bg-white mt-24 shadow-md">
        <div className="container mx-auto">
          <nav className="flex space-x-8 py-4">
            <a href="#" className="hover:text-blue-500 tab-link" data-tab="description">Description</a>
            <a href="#" className="hover:text-blue-500 tab-link" data-tab="instructor">Instructor</a>
            <a href="#" className="hover:text-blue-500 tab-link" data-tab="syllabus">Syllabus</a>
            <a href="#" className="hover:text-blue-500 tab-link" data-tab="prerequisite">Prerequisite</a>
          </nav>
        </div>
    </div>
    <h1 className="font-bold">
      Hello
    </h1>
    </>
  ); 
};

export default CourseDetails;
