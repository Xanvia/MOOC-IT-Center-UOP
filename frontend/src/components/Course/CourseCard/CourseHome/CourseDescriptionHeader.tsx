import React from "react";
import Breadcrumb from "../CourseHome/Breadcrumb";
import CourseBigImage from "./CourseBigImage";
import Image from "next/image";
import SolidButton from "@/components/Buttons/SolidButton";

interface BreadcrumbItem {
  breadcrumb: string;
  href?: string; // Make href optional
}

const breadcrumbs: BreadcrumbItem[] = [
  { breadcrumb: "Home", href: "/" },
  { breadcrumb: "> Courses", href: "/courses" },
  { breadcrumb: "> Basic Web Programming", href: "/courses/1" },
];

const computer = "/images/computer.jpg";

const CourseHeader: React.FC = () => {
  return (
    <>
      <Breadcrumb breadcrumbs={breadcrumbs} />

      {/* <CourseBigImage title="" image={computer} description=""/> */}

      <div className="bg-gradient-to-tl from-gray-600 to-gray-800 h-96 w-full relative">
        <Image
          src="/images/computer.jpg"
          alt="Computer"
          layout="fil"
          width={2000}
          height={500}
          className="w-full h-full object-cover absolute mix-blend-overlay"
        />
        <div className="p-24">
          <div className="grid grid-col-2 grid-flow-col gap-24">
            <div>
              <h1 className="text-white text-6xl font-bold">
                Basic Web Development
              </h1>
              <h2 className="text-white text-2xl">
                Offered by Imperiel Institute
              </h2>
            </div>
            <div>
              <h2 className="text-white space-y-6 text-2xl font-semibold ">
                Prof. Namal Balasooriya
              </h2>
              <h2 className="text-white space-y-6 text-sm">
                a few detail about Instructor
              </h2>
            </div>
          </div>
          <div className="mt-28 ml-32">
            <SolidButton type="submit" text="E N R O L L" onClick={() => {}} disabled={false} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseHeader;
