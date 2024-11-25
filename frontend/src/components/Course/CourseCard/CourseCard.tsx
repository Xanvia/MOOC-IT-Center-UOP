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
  CourseCardButtonClass,
} from "@/components/components.styles";

interface CourseCardProps {
  id: number;
  difficulty: string;
  title: string;
  institution: string;
  description: string;
  image: string;
  userRole: string | null; // Add userRole to the props
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  difficulty,
  institution,
  image,
  userRole, // Destructure userRole
}) => {
  const truncateDescription = (text: string | null | undefined, maxLength: number = 80): string => {
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
        <div className="flex item-center justify-center">Difficulty: {difficulty}</div>
        <div className="space-x-4 mt-3 border-t-2 p-1 border-gray-200">
          {userRole === "teacher" && ( // Conditionally render buttons for teachers only
            <>
              <Link href={`/courses/${id}/room`} className={CourseCardButtonClass}>
                Course Room
              </Link>
              <Link href={`/settings/${id}`} className={CourseCardButtonClass}>
                Settings
              </Link>
            </>
          )}
          {userRole === "student" && (
            // Dummy progress bar for students
            <div className="mt-2">
              <h3 className="text-sm font-semibold text-gray-600">Progress</h3>
              <div className="relative h-2 mt-2 bg-gray-300 rounded">
                <div
                  className="absolute top-0 left-0 h-full bg-blue-600 rounded"
                  style={{ width: "50%" }} // Dummy progress of 50%
                ></div>
              </div>
              <p className="mt-1 text-xs text-gray-500">50% completed</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

