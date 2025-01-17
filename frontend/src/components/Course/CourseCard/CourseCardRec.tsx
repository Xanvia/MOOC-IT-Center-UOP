"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import CourseRatingLabel from "./CourseRatingLabel";
import {
  CourseCardImageContainerClsx,
  CourseCardOuterClasses,
  CourseCardImageClsx,
  CourseCardTitleContainerClsx,
  CourseCardTitle,
} from "@/components/components.styles";

interface CourseCardProps {
  id: number;
  difficulty: string;
  title: string;
  institution: string;
  description: string;
  image: string;
  userRole?: string | null; // Add userRole to the props
  progress?: string | null;
}

const CourseCardRec: React.FC<CourseCardProps> = ({
  id,
  title,
  difficulty,
  institution,
  image,
  userRole, // Destructure userRole
  progress,
}) => {
  const truncateDescription = (
    text: string | null | undefined,
    maxLength: number = 80
  ): string => {
    if (typeof text !== "string") return ""; // Return empty string if text is not a string
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + "...";
  };

  return (
    <div className={CourseCardOuterClasses}>
      <div className={CourseCardImageContainerClsx}>
        {image ? (
          <Image src={image} alt={title} layout="fill" objectFit="cover" />
        ) : (
          <div className="w-full h-full bg-gray-200"></div> // Placeholder when no image
        )}
        <div className={CourseCardImageClsx}></div>
      </div>

      <div className="px-4 pt-2 flex flex-col">
        <div className={CourseCardTitleContainerClsx}>
          <h5 className={CourseCardTitle}>{title}</h5>
          <CourseRatingLabel ratings="4.2" />
        </div>
        <div className="w-full flex items-center justify-center py-2 border-t-2 font-semibold border-gray-200">
          {truncateDescription(institution, 27)}
        </div>
        <div className="flex item-center justify-center">
          Difficulty: {difficulty}
        </div>
        <div className="space-x-4 mt-3 border-t-2 p-1 border-gray-200">
          <h1 className="font-semibold text-center mt-2 hover:underline cursor-pointer">Click here to go to the Course</h1>
        </div>
      </div>
    </div>
  );
};

export default CourseCardRec;
