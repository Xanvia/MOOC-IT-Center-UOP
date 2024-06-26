"use client";
import React, { useState } from "react";
import Image from "next/image";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import CourseDescEditModal from "./CourseDescEditModal";
import { CourseData } from "../course.types";

const headerImage = "/images/course-header.jpg";

interface CourseHeaderProps {
courseData: CourseData
reloadData: () => void;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({
  courseData,
  reloadData
}) => {
  const [isEdit, setIsEdit] = useState(true);

  const handleClick = () => {};

  return (
    <>
      <div className="bg-gradient-to-tl from-gray-600 to-gray-800 h-96 w-full relative">
        <Image
          src={headerImage}
          alt="Computer"
          layout="fil"
          width={2000}
          height={500}
          className="w-full h-full object-cover absolute mix-blend-overlay"
          priority
        />
        <div className="lg:p-24 sm:p-20 p-10 pb-10 lg:pb-8 sm:pb-8">
          <div className="grid grid-cols-1 md:grid-flow-col gap-6 sm:gap-10 md:gap-24 sm:mx-16 min-h-[150px]">
            <div>
              <h1 className="text-white text-2xl sm:text-4xl md:text-4xl lg:text-5xl font-bold whit">
                {courseData.name}
              </h1>
              <h2 className="text-white sm:text-1xl lg:text-xl">
                Offered by {courseData.institution}
              </h2>
            </div>
            <div>
              <h2 className="text-white space-y-6 text-base sm:text-xl lg:text-2xl font-semibold ">
              {courseData.course_creator.full_name}
              </h2>
              <h2 className="text-white space-y-6 text-sm">
                {courseData.course_creator.headline}
              </h2>
            </div>
          </div>
          <div className="relative mt-10 sm:mt-10 md:mt-14 sm:ml-20 ml-2">
            {isEdit ? (
              <CourseDescEditModal courseData={courseData} reloadData={reloadData} />
            ) : (
              <PrimaryButton text="E N R O L" onClick={handleClick} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseHeader;
