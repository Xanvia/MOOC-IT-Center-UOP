import React from 'react';

interface Course {
  id: number;
  creator: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  isPublished: boolean;
}

interface CourseRowProps {
  course: Course;
  isPublished: boolean;
  onPublish: (id: number) => void;
}

const CourseRow: React.FC<CourseRowProps> = ({ course, isPublished, onPublish }) => {
  return (
    <tr className="border-b">
      <td className="px-6 py-4">{course.creator}</td>
      <td className="px-6 py-4">{course.name}</td>
      <td className="px-6 py-4">
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            course.level === 'Beginner' ? 'bg-yellow-200' :
            course.level === 'Intermediate' ? 'bg-green-200' : 'bg-red-200'
          }`}
        >
          {course.level}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex space-x-2">
          {isPublished ? (
            <>
              <button className="text-blue-600 hover:underline">View</button>
              <button className="text-blue-600 hover:underline">Comment</button>
            </>
          ) : (
            <>
              <button 
                className="bg-blue-600 text-white px-3 py-1 rounded"
                onClick={() => onPublish(course.id)}
              >
                Publish
              </button>
              <button className="text-blue-600 hover:underline">View</button>
              <button className="text-blue-600 hover:underline">Comment</button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default CourseRow;
