import React from "react";
import Breadcrumb from '../CourseHome/Breadcrumb';
import CourseBigImage from "./CourseBigImage";

interface BreadcrumbItem {
  breadcrumb: string;
  href?: string; // Make href optional
}

const breadcrumbs: BreadcrumbItem[] = [
  { breadcrumb: 'Home', href: '/' },
  { breadcrumb: '> Courses', href: '/courses' },
  { breadcrumb: '> Basic Web Programming', href: '/courses/1' },
];

const course3 = "/images/course3.png";

const CourseHeader: React.FC = () => {
  return (
    <>
      <Breadcrumb breadcrumbs={breadcrumbs}/>
      <div className = "">
      <CourseBigImage
            title="Digital Marketing"
            description="Material on beginner marketing strategies and concepts"
            image={course3}
          />
      </div>
      
    </>
  );
};

export default CourseHeader;
