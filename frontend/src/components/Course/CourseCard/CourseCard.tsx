import React from "react";
import CourseRatingLabel from "./CourseRatingLabel";
import CourseStats from "./CourseStats";
import { CourseCardImageContainerClsx, CourseCardOuterClasses,CourseCardImageClsx, CourseCardTitleContainerClsx, CourseCardTitle, CourseCardDescription } from "@/components/components.styles";
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
    <div className={CourseCardOuterClasses}>
      <div className={CourseCardImageContainerClsx}>
        <img src={image} alt="ui/ux review check" />
        <div className={CourseCardImageClsx}></div>
      </div>
      <div className="px-4 pt-2">
        <div className={CourseCardTitleContainerClsx}>
          <h5 className={CourseCardTitle}>
            {title}
          </h5>
          <CourseRatingLabel ratings="4.2" />
        </div>
        <p className={CourseCardDescription}>
          {description}
        </p>
        <CourseStats />
      </div>
    </div>
  );
};

export default CourseCard;
