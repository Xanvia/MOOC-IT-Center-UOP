"use client";

import React, { useState } from 'react';
import ToggleButton from '@/components/Buttons/ToggleButton';
import CourseTable from '@/components/CourseTable/CourseTable';

interface Course {
  id: number;
  creator: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  isPublished: boolean;
}

const CoursePage: React.FC = () => {
  const [isPublished, setIsPublished] = useState(false);

  const [courses, setCourses] = useState<Course[]>([
    { id: 1, creator: 'Candice Schiner', name: 'Computer Network', level: 'Beginner', isPublished: false },
    { id: 2, creator: 'John Doe', name: 'Materials Science', level: 'Intermediate', isPublished: false },
    { id: 3, creator: 'Candice Schiner', name: 'Computer Network', level: 'Advanced', isPublished: true },
  ]);

  const handleToggle = (status: boolean) => {
    setIsPublished(status);
  };

  const handlePublish = (courseId: number) => {
    setCourses(courses.map(course =>
      course.id === courseId ? { ...course, isPublished: true } : course
    ));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Courses</h2>
      <ToggleButton onToggle={handleToggle} />
      <CourseTable courses={courses} isPublished={isPublished} onPublish={handlePublish} />
    </div>
  );
};

export default CoursePage;
