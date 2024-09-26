import React from "react";
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
} from "@/components/components.styles";
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
      <div className="px-4 pt-2 flex flex-col ">
        <div className={CourseCardTitleContainerClsx}>
          <h5 className={CourseCardTitle}>{title}</h5>
          <CourseRatingLabel ratings="4.2" />
        </div>
        <p
          className={CourseCardDescription}
          dangerouslySetInnerHTML={{ __html: truncateDescription(description) }}
        ></p>
        <CourseStats />
      </div>
    </div>
  );
};

export default CourseCard;
