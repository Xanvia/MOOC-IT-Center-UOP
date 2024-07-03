import React from "react";
import Note from "@/components/Course/Note/Note";
import Breadcrumb from "@/components/Course/CourseHome/Breadcrumb";




const Page: React.FC = () => {
  return (
    <>
      
      
      <div className="flex-grow p-4">
        <Note/>
      </div>
    </>
  );
};

export default Page;
