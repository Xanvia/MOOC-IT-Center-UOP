"use client";
import React from "react";
import CourseRatingLabel from "./CourseRatingLabel";

interface CourseCardProps {
  title: string;
  description: string;
  image: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  image,
}) => {
  return (
    <div className="flex justify-center max-w-[360px] h-[360px] shadow-[0_5px_10px_rgba(0,0,0,0.1)] bg-white rounded-[10px] mx-8">
      <div className="flex flex-col w-full">
        <img src={image} className="relative" />
        <CourseRatingLabel ratings="3.9" />
        <div className="flex flex-col text-grey px-4">
          <div className="flex flex-col text-[#333] py-1 min-h-[95px]">
            <span className="text-[20px] font-bold">{title}</span>
            <span className="text-[15px] font-normal pt-1">{description}</span>
          </div>
          <div className="flex justify-center items-center py-2 border-t border-[#e7e7e7]">
            <div className="flex items-center text-[#333] px-3 border-r-2 border-r-[#e7e7e7] border-solid">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 22 22"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 mx-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span className="text-[12px]">6,2 Jam</span>
            </div>
            <div className="flex items-center text-[#333] px-3 py-0 border-r-2 border-r-[#e7e7e7] border-solid">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 mx-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
                />
              </svg>
              <span className="text-[12px]">32 Video</span>
            </div>
            <div className="flex items-center text-[#333] px-3 py-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                />
              </svg>
              <span className="flex text-[12px]">930 Siswa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
