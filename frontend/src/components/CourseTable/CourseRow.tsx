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
        <div className="flex space-x-9">
          {isPublished ? (
            <>
              <button className="bg-gray-400 hover:bg-gray-300 text-white px-3 py-1 rounded-md">Send Message</button>
            </>
          ) : (
            <>
              <button 
                className="bg-blue-900 hover:bg-blue-800 text-white px-3 py-1 rounded-md"
                onClick={() => onPublish(course.id)}
              >
                Publish
              </button>
              <button className="bg-gray-400 hover:bg-gray-300 text-white px-3 py-1 rounded-md">View</button>
              <button className="bg-gray-400 hover:bg-gray-300 text-white px-3 py-1 rounded-md">Send Message</button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default CourseRow;
