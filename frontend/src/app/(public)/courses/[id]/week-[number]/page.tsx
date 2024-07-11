import React from "react";
import Note from "@/components/Course/Note/Note";
import Quiz from "@/components/Course/Quiz/Quiz";

const Page: React.FC = () => {
  return (
    <>
      
      
      <div className="flex-grow p-4 mb-96 ml-96">
        <Note/>
        <Quiz/>
      </div>
    </>
  );
};

export default Page;
