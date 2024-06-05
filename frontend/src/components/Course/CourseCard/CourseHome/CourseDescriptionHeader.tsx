import React from "react";
import Breadcrumb from '../CourseHome/Breadcrumb';
import CourseBigImage from "./CourseBigImage";
import Image from "next/image";

interface BreadcrumbItem {
  breadcrumb: string;
  href?: string; // Make href optional
}

const breadcrumbs: BreadcrumbItem[] = [
  { breadcrumb: 'Home', href: '/' },
  { breadcrumb: '> Courses', href: '/courses' },
  { breadcrumb: '> Basic Web Programming', href: '/courses/1' },
];

const computer = "/images/computer.jpg";

const CourseHeader: React.FC = () => {
  return (
    <>
      <Breadcrumb breadcrumbs={breadcrumbs}/>
      {/* <div className = "bg-[/images/computer.jpg] h-96 w-full bg-cover bg-center p-24">
      </div> */}

      {/* <CourseBigImage title="" image={computer} description=""/> */}
      
      <div className="bg-gradient-to-tl from-slate-400 to-slate-300 h-96 w-full relative">
        <Image 
          src="/images/computer.jpg" 
          alt="Computerr"
          layout="fil"
          width={2000}
          height={500}
          className="w-full h-full object-cover absolute mix-blend-overlay" />
      </div>

    </>
  );
};

export default CourseHeader;
