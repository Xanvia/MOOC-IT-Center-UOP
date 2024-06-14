import React from "react";

const CourseOutcomes: React.FC = () => {
  return (
    <div className="w-full mb-10">
      <div className="flex justify-center lg:mx-32">
        <div className="py-14 px-10 sm:px-20 xl:mx-28  text-left bg-primary_light w-full">
          <h1 className="text-2xl text-primary font-semibold mt-4">
            Benifits of Learning This Course
          </h1>

          <ul className="mt-10  text-primary list-none list-inside space-y-2">
            <li>
              + The ins and outs of HTML5, CSS3, and Modern JavaScript for 2021
            </li>
            <li>
              + Use CSS Frameworks including Bootstrap 5, Semantic UI, and Bulma
            </li>
            <li>
              + Write Javascript functions, and understand scope and higher
              order functions
            </li>
            <li>
              + Use Express and MongoDB to create full-stack JS applications
            </li>
            <li>
              + Make REAL web applications using cutting-edge technologies
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseOutcomes;
