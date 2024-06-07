import React from "react";
import CourseDetailsTabs from "./Tabs/CourseDetailsTabs";

const CourseDetails: React.FC = () => {
  return (
    <>  
    <center>
      <div className="bg-white shadow-sm mt-10">
        <div className="container mx-auto p-8">
          <CourseDetailsTabs/>
        </div>
      </div>
    </center>
    
    
    
    </>
  ); 
};

export default CourseDetails;
