import React from 'react';
import CourseRow from './CourseRow';

interface Course {
  id: number;
  creator: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  isPublished: boolean;
}

interface CourseTableProps {
  courses: Course[];
  isPublished: boolean;
  onPublish: (id: number) => void;
}

const CourseTable: React.FC<CourseTableProps> = ({ courses, isPublished, onPublish }) => {
  const filteredCourses = courses.filter(course => course.isPublished === isPublished);

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left">Course Creator</th>
            <th className="px-6 py-3 text-left">Course</th>
            <th className="px-6 py-3 text-left">Level</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.map(course => (
            <CourseRow key={course.id} course={course} isPublished={isPublished} onPublish={onPublish} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;
