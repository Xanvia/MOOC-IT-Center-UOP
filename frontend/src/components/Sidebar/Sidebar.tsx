"use client";
// components/Sidebar.tsx
import React, { useState } from 'react';
import CourseCard from '../Course/CourseCard/CourseCard';
import RecommendedCourses from '../Course/CourseCard/ReccomendedCourses';
import CourseOutcomes from '../Course/CourseCard/CourseHome/CourseOutcomes';

const headerImage = "/images/course-header.jpg";


const topics = [
  {
    category: 'Intro',
    items: [{ title: 'Instructor introduction', content: 'Content for Instructor introduction' }],
  },
  {
    category: 'Installation',
    items: [
      { title: 'Download Tools', content: <CourseOutcomes/> },
      { title: 'Tools Instalation', content: <p>content for tools installation</p> },
      { title: 'Basic Usage Tools', content: <CourseCard
      title="Basic Usage Tools"
      description="Learn how to install tools necessary for web development."
      image="/images/course-header.jpg"
    /> },
    ],
  },
  {
    category: 'Basic HTML',
    items: [
      { title: 'About HTML', content: 'Content for About HTML' },
      { title: 'Running Code', content: 'Content for Running Code' },
      { title: 'Tag', content: 'Content for Tag' },
      { title: 'Header and Paragraph', content: 'Content for Header and Paragraph' },
      { title: 'List', content: 'Content for List' },
      { title: 'Table', content: 'Content for Table' },
    ],
  },
];

const Sidebar = () => {
  const [selectedTopic, setSelectedTopic] = useState(topics[0].items[0]);

  return (
    <div className="flex bg-white">
      <div className="w-72 p-4 border-r border-gray-200">
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Stats</h3>
          <div className="relative h-2 mt-2 bg-gray-300 rounded">
            <div className="absolute top-0 left-0 h-full bg-blue-600 rounded" style={{ width: '20%' }}></div>
          </div>
          <p className="my-2 text-sm text-gray-600">4 of the 20 videos have been completed</p>
        </div>
        {topics.map((topic, index) => (
          <div key={index} className="mb-6 ml-4">
            <h4 className="text-md font-medium">{topic.category}</h4>
            {topic.items.map((item, idx) => (
              <p
                key={idx}
                className={`mt-2 ml-4 cursor-pointer ${
                  selectedTopic.title === item.title ? 'font-semibold text-blue-600' : 'text-blue-600'
                } hover:underline`}
                onClick={() => setSelectedTopic(item)}
              >
                {item.title}
              </p>
            ))}
          </div>
        ))}
      </div>
      <div className="flex-grow p-4">
        <h1 className="text-xl font-bold">{selectedTopic.title}</h1>
        <p className="mt-4">{selectedTopic.content}</p>
      </div>
      
    </div>
    
  );
};

export default Sidebar;
 