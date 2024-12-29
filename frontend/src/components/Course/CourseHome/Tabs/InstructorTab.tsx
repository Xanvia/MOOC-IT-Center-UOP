import Image from "next/image";
import React from "react";
import { Instructor } from "../../course.types";

interface Props {
  instructors: Instructor[];
}

const Example: React.FC<Props> = ({ instructors }) => {
  return (
    <div className="w-full mb-10">
      <div className="flex justify-center lg:mx-32">
      <div className="py-20 px-10 sm:px-20 xl:mx-28 text-left bg-primary_light w-full">
          <figure className="mt-6 text-center">
            <blockquote className="text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9"></blockquote>
            <figcaption className="mt-6 flex flex-wrap justify-center gap-20">
              {instructors.map((instructor, index) => (
                <div
                  key={index}
                  className="flex w-80 items-center rounded-lg border bg-white border-gray-200 p-4 shadow-md hover:shadow-lg transition-shadow"
                >
                  
                  <div className="flex-shrink-0">
                    <Image
                      alt=""
                      src={instructor.profile_picture}
                      className="h-16 w-16 rounded-full object-cover"
                      width={64}
                      height={64}
                    />
                  </div>
                  
                  <div className="mx-4 h-16 w-px bg-gray-400"></div>
                  
                  <div className="flex flex-col items-start space-y-1">
                    <div className="font-semibold text-gray-900">
                      {instructor.full_name}
                    </div>
                    <div className="text-gray-600">{instructor.headline}</div>
                    <div className="text-gray-600">{instructor.email}</div>
                  </div>
                </div>
              ))}
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
};

export default Example;
