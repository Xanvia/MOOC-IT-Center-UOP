import React from "react";

const CourseHStat: React.FC = () => {
  return (
    <div className="bg-primary_light py-5 mt-2 md:mt-0 absolute w-full">
      <div className="max-w-7xl md:mx-28 sm:mx-10">
        <div className="grid sm:grid-cols-6 sm:gap-8 gap-2 text-center">
          <div>
            <p className="md:text-xl sm:text-base text-sm font-bold " >21.000+</p>
            <p className="text-gray-500 text-xs md:text-base ">Students Enrolled</p>
          </div>
          <div>
          <p className="md:text-xl sm:text-base text-sm font-bold " >20</p>
          <p className="text-gray-500 text-xs md:text-base ">Weeks</p>
          </div>
          <div>
          <p className="md:text-xl sm:text-base text-sm font-bold " >30+</p>
          <p className="text-gray-500 text-xs md:text-base ">Lessons</p>
          </div>
          <div>
          <p className="md:text-xl sm:text-base text-sm font-bold " >50+</p>
          <p className="text-gray-500 text-xs md:text-base ">Activities</p>
          </div>
          <div>
          <p className="md:text-xl sm:text-base text-sm font-bold " >4.3</p>
          <p className="text-gray-500 text-xs md:text-base ">Ratings</p>
          </div>
          <div>
          <p className="md:text-xl sm:text-base text-sm font-bold " >BEGINNER </p>
          <p className="text-gray-500 text-xs md:text-base ">Level</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHStat;
