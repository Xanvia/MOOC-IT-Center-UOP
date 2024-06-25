import React from "react";

interface CourseOutcomesProps {
  outcomes: string[];
}

const CourseOutcomes: React.FC<CourseOutcomesProps> = ({ outcomes }) => {
  return (
    <div className="w-full mb-10">
      <div className="flex justify-center lg:mx-32">
        <div className="py-14 px-10 sm:px-20 xl:mx-28 text-left bg-primary_light w-full">
          <h1 className="text-2xl text-primary font-semibold mt-4">
            Benefits of Learning This Course
          </h1>

          <ul className="mt-10 text-primary list-none list-inside space-y-2">
            {outcomes.map((outcome, index) => (
              <li key={index}>
                + {outcome}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseOutcomes;
