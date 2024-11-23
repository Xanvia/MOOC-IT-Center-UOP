"use client";
import React, { useState, Suspense, useEffect } from "react";
import Link from "next/link";
import CourseRatingLabel from "./CourseRatingLabel";
import CourseStats from "./CourseStats";
import Image from "next/image";
import {
  CourseCardImageContainerClsx,
  CourseCardOuterClasses,
  CourseCardImageClsx,
  CourseCardTitleContainerClsx,
  CourseCardTitle,
  CourseCardDescription,
  CourseCardButtonClass,
} from "@/components/components.styles";

interface CourseCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  description,
  image,
}) => {
  const truncateDescription = (text: string | null | undefined, maxLength: number = 80): string => {
    if (typeof text !== 'string') return ''; // Return empty string if text is not a string
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
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
        
        <p
          className={CourseCardDescription}
          dangerouslySetInnerHTML={{ __html: truncateDescription(description) }}
        ></p>
        <div className="space-x-4 mt-2">
          {/* {courses.map((course) => ( */}
            <>
          <Link href={`/courses/${id}`} className={CourseCardButtonClass}>
            Course Room
          </Link>
          <Link href={`/settings/${id}`} className={CourseCardButtonClass}>
            Settings
          </Link>
          </>
          {/* ))} */}
        </div>
        <CourseStats />
      </div>
    </div>
  );
};

export default CourseCard;

// const CourseCard: React.FC<CourseCardProps> = ({
//   id,
//   title,
//   description,
//   image,
// }) => {
//   const truncateDescription = (
//     text: string | null | undefined,
//     maxLength: number = 80
//   ): string => {
//     if (typeof text !== "string") return ""; // Return empty string if text is not a string
//     if (text.length <= maxLength) return text;
//     return text.slice(0, maxLength).trim() + "...";
//   };

//   const [courses, setCourses] = useState<CourseData[]>([]);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await fetchMyCourses();
//         setCourses(response.courses);
//       } catch (error) {
//         console.error("Failed to fetch courses", error);
//       }
//     };
//     fetchCourses();
//   }, []);

//   // Render only buttons related to this course
//   const renderCourseButtons = () => {
//     return (
//       <>
//         <Link href={`/courses/${id}`} className={CourseCardButtonClass}>
//           Course Room
//         </Link>
//         <Link href={`/settings/${id}`} className={CourseCardButtonClass}>
//           Settings
//         </Link>
//       </>
//     );
//   };

//   return (
//     <div className={CourseCardOuterClasses}>
//       <div className={CourseCardImageContainerClsx}>
//         {image ? (
//           <Image src={image} alt={title} layout="fill" objectFit="cover" />
//         ) : (
//           <div className="w-full h-full bg-gray-200"></div> // Placeholder when no image
//         )}
//         <div className={CourseCardImageClsx}></div>
//       </div>

//       <div className="px-4 pt-2 flex flex-col">
//         <div className={CourseCardTitleContainerClsx}>
//           <h5 className={CourseCardTitle}>{title}</h5>
//           <CourseRatingLabel ratings="4.2" />
//         </div>

//         <p
//           className={CourseCardDescription}
//           dangerouslySetInnerHTML={{ __html: truncateDescription(description) }}
//         ></p>

//         <div className="space-x-4 mt-2">{renderCourseButtons()}</div>
//         <CourseStats />
//       </div>
//     </div>
//   );
// };

// export default CourseCard;
