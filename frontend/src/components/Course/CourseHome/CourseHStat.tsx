import React from "react";

interface CourseHStatProps {
  studentsEnrolled: string;
  duration: string;
  lessons: string;
  activities: string;
  ratings: number;
  level: string;
}

const CourseHStat: React.FC<CourseHStatProps> = ({
  studentsEnrolled,
  duration,
  lessons,
  activities,
  ratings,
  level,
}) => {
  const parts = duration.split(" ");
  const number = parts[0];
  const durationType = parts[1];

  return (
    <div className="bg-primary_light py-5 md:mt-0  w-full">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 sm:gap-8 gap-2 text-center">
          <div>
            <p className="md:text-xl sm:text-base text-sm font-bold ">
              21.000+
            </p>
            <p className="text-gray-500 text-xs md:text-base ">
              Students Enrolled
            </p>
          </div>
          <div>
            <p className="md:text-xl sm:text-base text-sm font-bold ">
              {number}
            </p>
            <p className="text-gray-500 text-xs md:text-base ">
              {durationType}
            </p>
          </div>
          <div>
            <p className="md:text-xl sm:text-base text-sm font-bold ">
              {lessons}
            </p>
            <p className="text-gray-500 text-xs md:text-base ">Lessons</p>
          </div>
          <div>
            <p className="md:text-xl sm:text-base text-sm font-bold ">
              {activities}
            </p>
            <p className="text-gray-500 text-xs md:text-base ">Activities</p>
          </div>
          <div>
            <p className="md:text-xl sm:text-base text-sm font-bold ">
              {ratings}
            </p>
            <p className="text-gray-500 text-xs md:text-base ">Ratings</p>
          </div>
          <div>
            <p className="md:text-xl sm:text-base text-sm font-bold ">
              {level}
            </p>
            <p className="text-gray-500 text-xs md:text-base ">Level</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHStat;
