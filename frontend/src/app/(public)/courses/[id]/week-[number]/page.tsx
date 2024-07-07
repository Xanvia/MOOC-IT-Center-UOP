import React from "react";
import CourseVideo from "@/components/Course/CourseVideo/CourseVideo";

const Page: React.FC = () => {
  return (
    <div className="flex-grow p-4">

{/* <div className="flex-grow p-4 mb-96">
        <Note/>
      </div> */}
      <CourseVideo />
      <h1 className="text-xl font-bold"></h1>
      <div className="mt-4"></div>
    </div>
  );
};

export default Page;
