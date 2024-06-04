import React from "react";
import Breadcrumb from '../CourseHome/Breadcrumb';

interface BreadcrumbItem {
  breadcrumb: string;
  href?: string; // Make href optional
}

const breadcrumbs: BreadcrumbItem[] = [
  { breadcrumb: 'Home >', href: '/' },
  { breadcrumb: 'Courses  >', href: '/courses' },
  { breadcrumb: 'Basic Web Programming  >', href: '/courses/1' },
];

const computer = "/images/computer.jpg";
const CourseHeader: React.FC = () => {
  return (
    <>
      <div className="bg-white shadow-md">
        <div className="container mx-auto">
          <nav className="flex space-x-8 py-4">
            <a
              href="#"
              className="hover:text-blue-500 tab-link"
              data-tab="description"
            >
              Description
            </a>
            <a
              href="#"
              className="hover:text-blue-500 tab-link"
              data-tab="instructor"
            >
              Instructor
            </a>
            <a
              href="#"
              className="hover:text-blue-500 tab-link"
              data-tab="syllabus"
            >
              Syllabus
            </a>
            <a
              href="#"
              className="hover:text-blue-500 tab-link"
              data-tab="prerequisite"
            >
              Prerequisite
            </a>
          </nav>
        </div>
        <Breadcrumb breadcrumbs={breadcrumbs}/>
        <div className="container mx-auto my-8 p-4 bg-white shadow-md">
          {/* Description Content */}
          <div>
            <div id="description" className="tab-content active">
              <h2 className="text-2xl font-bold mb-4">About the Course</h2>
              <p className="mb-4">
                This course provides an introduction to web development using
                HTML, CSS, and JavaScript. You learn how to create responsive
                and interactive web pages, and youll gain a solid foundation in
                web programming.
              </p>
            </div>

            <div className="w-full h-64 bg-white">
              image={computer}
              {/* Add image */}
            </div>

            <div>
              <ul className="list-disc">
                <h1 className="font-bold">Specification and Software</h1>
                <li className="ml-10">Pc/laptop</li>
                <li className="ml-10">Browser</li>
                <li className="ml-10">Text editor</li>
                <li className="ml-10">Akses Internet</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseHeader;
