import Image from "next/image";
import React from "react";
import { Instructor } from "../../course.types";
import Link from "next/link";

interface Props {
  instructors: Instructor[];
}

const InstructorTab: React.FC<Props> = ({ instructors }) => {
  return (
    <div className="w-full mb-10">
      <div className="flex justify-center">
        <div className="py-20 px-10 sm:px-20 xl:mx-28 text-left bg-primary_light w-full max-w-4xl">
          <h1 className="text-3xl font-bold mb-8 text-center">Instructors</h1>
          <div className="flex flex-col items-center space-y-6">
            {instructors.map((instructor) => (
              <Link
                key={instructor.id}
                href={`/profile/${instructor.id}`}
                className="w-full max-w-lg"
              >
                <div className="flex w-full items-center rounded-lg border bg-white border-gray-200 p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                  {/* Profile Image */}
                  <div className="flex-shrink-0">
                    <Image
                      alt={instructor.full_name}
                      src={instructor.profile_picture || "/default-avatar.png"}
                      className="h-16 w-16 rounded-full object-cover"
                      width={64}
                      height={64}
                    />
                  </div>

                  {/* Divider */}
                  <div className="mx-4 h-16 w-px bg-gray-400"></div>

                  {/* Instructor Details */}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorTab;
