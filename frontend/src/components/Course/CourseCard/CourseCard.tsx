import React from "react";
import CourseRatingLabel from "./CourseRatingLabel";
import CourseStats from "./CourseStats";
import { CourseCardClasses } from "@/components/components.styles";
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
    <div className={CourseCardClasses}>
      <div className="flex flex-col w-full">
        <img src={image} className="relative" />
        <CourseRatingLabel ratings="3.9" />
        <div className="flex flex-col text-grey px-4">
          <div className="flex flex-col text-[#333] py-1 min-h-[95px]">
            <span className="text-[20px] font-bold">{title}</span>
            <span className="text-[15px] font-normal pt-1">{description}</span>
          </div>
          <CourseStats />
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
