import Image from "next/image";
import React from "react";
import { Instructor } from "../../course.types";

interface Props {
  instructors: Instructor[];
}

const Example: React.FC<Props> = ({ instructors }) => {
  return (
    <div>
      <section className="relative isolate overflow-hidden bg-white px-6 py-6 sm:py-16 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <div className="lg:mx-32"></div>
          <figure className="mt-2 text-center">
            <blockquote className="text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9"></blockquote>
            <figcaption className="mt-2 flex flex-wrap justify-center gap-20">
              {instructors.map((instructor, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-1 text-base"
                >
                  <Image
                    alt=""
                    src={instructor.profile_picture}
                    className="h-12 w-12 rounded-full"
                    width={48}
                    height={48}
                  />
                  <div className="font-semibold text-gray-900">
                    {instructor.full_name}
                  </div>
                  <div className="text-gray-600">{instructor.headline}</div>
                  <div className="text-gray-600">{instructor.email}</div>
                </div>
              ))}
            </figcaption>
          </figure>

        </div>
      </section>
    </div>
  );
};

export default Example;
