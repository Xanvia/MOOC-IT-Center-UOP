"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import CourseRatingLabel from "./CourseRatingLabel";
import { BookOpen, Settings, Users } from "lucide-react";
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
  progress: string | null;
}

const CourseCard: React.FC<CourseCardProps> = ({
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
          {userRole === "teacher" && (
            <>
              <div className="flex space-x-4 justify-center mt-2">
                {/* Number of Students Section */}
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-800" />
                  <span className="text-sm font-medium text-gray-700">
                    25 Students
                  </span>
                </div>

                {/* Settings Button */}

                <Link
                  href={`/settings/${id}`}
                  className="relative group flex items-center justify-center w-10 h-10  bg-white rounded-full hover:bg-gray-100"
                >
                  {/* Icon */}
                  <Settings className="h-6 w-6 text-blue-800" />

                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 px-1 py-1 text-xs text-white bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Go to Settings
                  </span>
                </Link>

                {/* Course Room Button with Tooltip */}
                <Link
                  href={`/courses/${id}/room`}
                  className="relative group flex items-center justify-center w-10 h-10 bg-white rounded-full hover:bg-gray-100"
                >
                  {/* Icon */}
                  <BookOpen className="h-6 w-6 text-blue-800" />

                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 px-1 py-1 text-xs text-white bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Go to Course Room
                  </span>
                </Link>
              </div>
            </>
          )}

          {userRole === "student" && (
            // Dummy progress bar for students
            <div className="flex items-center space-x-4">
              {/* Progress Bar Section */}
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-600">
                  Progress
                </h3>
                <div className="relative h-2 mt-2 bg-gray-300 rounded">
                  <div
                    className="absolute top-0 left-0 h-full bg-blue-800 rounded"
                    style={{ width: progress ? `${progress}%` : "0%" }} // Use progress if available, otherwise 0%
                  ></div>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {progress || 0}% completed
                </p>
              </div>

              {/* Course Room Button Section */}
              <div className="flex items-center space-x-2 flex-none w-[17%]">
                <Link
                  href={`/courses/${id}/room`}
                  className="relative group flex items-center justify-center w-10 h-10 bg-blue-800 rounded-full hover:bg-blue-900"
                >
                  {/* Icon */}
                  <BookOpen className="h-6 w-6 text-white" />

                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 px-1 py-1 text-xs text-white bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Go to Course Room
                  </span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
