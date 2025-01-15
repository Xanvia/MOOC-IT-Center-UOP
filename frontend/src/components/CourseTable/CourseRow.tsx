import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye } from "lucide-react";

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
        <div className="flex space-x-4">
          {isPublished ? (
            <>
              <Link href={`/courses/${course.id}`}>
                <Eye size={20} className="text-blue-500 my-2" />
              </Link>
              <Link
                href={`chat/${course.id}/`}
                className="bg-green-400 hover:bg-gray-400 text-white px-3 py-1 rounded-md"
              >
                Send Message
              </Link>
            </>
          ) : (
            <>
              <Link href={`/courses/${course.id}`}>
                <Eye size={20} className="text-blue-500 my-2" />
              </Link>
              <button
                className="bg-blue-900 hover:bg-blue-800 text-white px-3 py-1 rounded-md"
                onClick={() => onPublish(course.id)}
              >
                Publish
              </button>
              <Link
                href={`chat/${course.id}/`}
                className="bg-green-500 hover:bg-gray-400 text-white px-3 py-1 rounded-md"
              >
                Send Message
              </Link>
            </>
          )}
        </div>
      </td>
      <td className="px-6 py-4">
        <Link
          href={`courses/${course.id}/`}
          className="bg-button_yellow hover:bg-gray-400 text-red-500 px-3 py-1 rounded-md"
        >
          View Payments
        </Link>
      </td>
    </tr>
  );
};

export default CourseRow;