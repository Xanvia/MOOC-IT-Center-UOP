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
    { id: 4, creator: 'Alice Johnson', name: 'Data Science 101', level: 'Beginner', isPublished: true },
    { id: 5, creator: 'Bob Smith', name: 'Machine Learning Basics', level: 'Intermediate', isPublished: false },
    { id: 6, creator: 'Candice Schiner', name: 'Computer Network', level: 'Advanced', isPublished: true },
    { id: 7, creator: 'David Lee', name: 'Artificial Intelligence', level: 'Advanced', isPublished: false },
    { id: 8, creator: 'Eva Turner', name: 'Introduction to Programming', level: 'Beginner', isPublished: true },
    { id: 9, creator: 'Frank Green', name: 'Cybersecurity Fundamentals', level: 'Intermediate', isPublished: true },
    { id: 10, creator: 'Grace Adams', name: 'Web Development', level: 'Advanced', isPublished: false },
    { id: 11, creator: 'Hannah Brown', name: 'Cloud Computing', level: 'Intermediate', isPublished: true },
    { id: 12, creator: 'Ian White', name: 'Database Management', level: 'Beginner', isPublished: false },
    { id: 13, creator: 'Julia Clark', name: 'Python for Data Analysis', level: 'Advanced', isPublished: true },    
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
    <div className="flex h-screen bg-gray-50">
      <main className="flex-1 flex flex-col overflow-hidden p-6 bg-white rounded-lg shadow-md mx-6 my-6">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-4">Manage Courses</h2>
          <div><ToggleButton onToggle={handleToggle} /></div>
          <CourseTable courses={courses} isPublished={isPublished} onPublish={handlePublish} />

      </main>
    </div>
  );
};

export default CoursePage;
