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
    <div className="flex flex-col bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="overflow-auto max-h-[480px]">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">Course Creator</th>
              <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">Course</th>
              <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">Level</th>
              <th className="px-6 py-3 text-left text-s font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map(course => (
              <CourseRow key={course.id} course={course} isPublished={isPublished} onPublish={onPublish} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseTable;
