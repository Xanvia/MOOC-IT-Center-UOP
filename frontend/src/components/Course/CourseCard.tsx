import React from "react";

interface CourseCardProps {
  title: string;
  description: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, description }) => {
  return (
    <div className="course-card">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default CourseCard;
