import Image from "next/image";
import React from "react";
import { Instructor } from "../../course.types";
import Link from "next/link";

interface Props {
  instructors: Instructor[];
}

const InstructorCard: React.FC<Props> = ({ instructors }) => {
  return (
    <div className="w-full mb-10">
      <div className="flex justify-center lg:mx-32">
        <div className="py-20 px-10 sm:px-20 xl:mx-28 text-left bg-primary_light w-full">
          <figure className="mt-6 text-center">
            <blockquote className="text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9"></blockquote>
            <figcaption className="mt-4 flex flex-wrap justify-center gap-8">
              {instructors.map((instructor) => (
                <Link
                  key={instructor.id} 
                  href={`/profile/${instructor.id}`}
                  passHref
                >
                  <div className="flex w-80 cursor-pointer items-center rounded-lg border bg-white border-gray-200 p-4 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex-shrink-0">
                      <Image
                        alt={`${instructor.full_name}'s profile picture`}
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
                </Link>
              ))}
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;
