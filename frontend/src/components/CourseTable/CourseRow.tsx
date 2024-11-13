import React from "react";
import { useRouter } from "next/navigation";

interface Course {
  id: number;
  course_creator: string;
  name: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

interface CourseRowProps {
  course: Course;
  isPublished: boolean;
  onPublish: (id: number) => void;
}

const CourseRow: React.FC<CourseRowProps> = ({
  course,
  isPublished,
  onPublish,
}) => {
  const router = useRouter();

  return (
    <tr className="border-b">
      <td className="px-6 py-4">{course.course_creator}</td>
      <td className="px-6 py-4">{course.name}</td>
      <td className="px-6 py-4">
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            course.difficulty === "Beginner"
              ? "bg-yellow-200"
              : course.difficulty === "Intermediate"
              ? "bg-green-200"
              : "bg-red-200"
          }`}
        >
          {course.difficulty}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex space-x-9">
          {isPublished ? (
            <>
              <button className="bg-gray-400 hover:bg-gray-300 text-white px-3 py-1 rounded-md">
                View
              </button>
              <button className="bg-gray-400 hover:bg-gray-300 text-white px-3 py-1 rounded-md">
                Send Message
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-blue-900 hover:bg-blue-800 text-white px-3 py-1 rounded-md"
                onClick={() => onPublish(course.id)}
              >
                Publish
              </button>
              <button className="bg-gray-400 hover:bg-gray-300 text-white px-3 py-1 rounded-md">
                View
              </button>
              <button className="bg-gray-400 hover:bg-gray-300 text-white px-3 py-1 rounded-md">
                Send Message
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default CourseRow;
