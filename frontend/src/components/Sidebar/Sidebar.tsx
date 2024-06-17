"use client";
import React, { useState } from 'react';
import CourseCard from '../Course/CourseCard/CourseCard';
import CourseOutcomes from '../Course/CourseHome/CourseOutcomes';
import { FaVideo, FaStickyNote, FaQuestionCircle } from 'react-icons/fa';

interface Item {
  title: string;
  content: JSX.Element | string;
  type: 'video' | 'note' | 'quiz';
}

interface Subtopic {
  title: string;
  items: Item[];
}

interface Topic {
  category: string;
  subtopics: Subtopic[];
}

const topics: Topic[] = [
  {
    category: 'Week 1',
    subtopics: [
      {
        title: 'Introduction',
        items: [{ title: 'Instructor introduction', content: 'Content for Instructor introduction', type: 'note' }],
      },
    ],
  },
  {
    category: 'Week 2',
    subtopics: [
      {
        title: 'Tools',
        items: [
          { title: 'Download Tools', content: <CourseOutcomes />, type: 'video' },
          { title: 'Tools Installation', content: <p>Content for tools installation</p>, type: 'note' },
          {
            title: 'Basic Usage Tools',
            content: (
              <CourseCard
                title="Basic Usage Tools"
                description="Learn how to install tools necessary for web development."
                image="/images/course-header.jpg"
              />
            ),
            type: 'video',
          },
        ],
      },
    ],
  },
  {
    category: 'Week 3',
    subtopics: [
      {
        title: 'HTML Basics',
        items: [
          { title: 'About HTML', content: 'Content for About HTML', type: 'note' },
          { title: 'Running Code', content: 'Content for Running Code', type: 'video' },
          { title: 'Tag', content: 'Content for Tag', type: 'quiz' },
          { title: 'Header and Paragraph', content: 'Content for Header and Paragraph', type: 'video' },
          { title: 'List', content: 'Content for List', type: 'note' },
          { title: 'Table', content: 'Content for Table', type: 'quiz' },
        ],
      },
      {
        title: 'Tools',
        items: [
          { title: 'Download Tools', content: <CourseOutcomes />, type: 'video' },
          { title: 'Tools Installation', content: <p>Content for tools installation</p>, type: 'note' },
          {
            title: 'Basic Usage Tools',
            content: (
              <CourseCard
                title="Basic Usage Tools"
                description="Learn how to install tools necessary for web development."
                image="/images/course-header.jpg"
              />
            ),
            type: 'quiz',
          },
        ],
      },
    ],
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'video':
      return <svg className="h-5 w-5 inline-block mr-2"   viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <circle cx="12" cy="12" r="10" />  <polygon points="10 8 16 12 10 16 10 8" /></svg>
    ;
    case 'note':
      return <svg className="h-5 w-5 inline-block mr-2 m"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />  <polyline points="14 2 14 8 20 8" />  <line x1="16" y1="13" x2="8" y2="13" />  <line x1="16" y1="17" x2="8" y2="17" />  <polyline points="10 9 9 9 8 9" /></svg>
    
    ;
    case 'quiz':
      return <svg className="h-5 w-5 inline-block mr-2"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M14 3v4a1 1 0 0 0 1 1h4" />  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />  <path d="M9 15l2 2l4 -4" /></svg>;
    default:
      return null;
  }
};

const Sidebar: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<Item>(topics[0].subtopics[0].items[0]);
  const [expandedWeeks, setExpandedWeeks] = useState<{ [key: number]: boolean }>({});
  const [expandedSubtopics, setExpandedSubtopics] = useState<{ [weekIndex: number]: { [subtopicIndex: number]: boolean } }>({});

  const toggleWeek = (weekIndex: number) => {
    setExpandedWeeks((prev) => ({
      ...prev,
      [weekIndex]: !prev[weekIndex],
    }));
  };

  const toggleSubtopic = (weekIndex: number, subtopicIndex: number) => {
    setExpandedSubtopics((prev) => ({
      ...prev,
      [weekIndex]: {
        ...prev[weekIndex],
        [subtopicIndex]: !(prev[weekIndex] && prev[weekIndex][subtopicIndex]),
      },
    }));
  };

  return (
    <div className="flex">
      <div className="w-84 p-8 border-r bg-white border-gray-200">
        <div className="mt-4 mb-10">
          <h3 className="text-lg font-semibold">Progress</h3>
          <div className="relative h-2 mt-2 bg-gray-300 rounded">
            <div className="absolute top-0 left-0 h-full bg-blue-600 rounded" style={{ width: '20%' }}></div>
          </div>
          <p className="my-2 text-sm text-gray-600">4 of the 20 videos have been completed</p>
        </div>
        {topics.map((topic, weekIndex) => (
          <div key={weekIndex} className="mb-8 mx-2 border-b pb-2 border-gray-200">
            <h4
              className="text-md font-medium text-primary border-b pb-1 mb-2 border-gray-400 cursor-pointer"
              onClick={() => toggleWeek(weekIndex)}
            >
              {topic.category}
            </h4>
            {expandedWeeks[weekIndex] && (
              <div>
                {topic.subtopics.map((subtopic, subtopicIndex) => (
                  <div key={subtopicIndex}>
                    <h5
                      className="text-md font-medium ml-4 my-4 cursor-pointer"
                      onClick={() => toggleSubtopic(weekIndex, subtopicIndex)}
                    >
                      {subtopic.title}
                    </h5>
                    {expandedSubtopics[weekIndex] && expandedSubtopics[weekIndex][subtopicIndex] && (
                      <div>
                        {subtopic.items.map((item, itemIndex) => (
                          <p
                            key={itemIndex}
                            className={`mt-3 ml-8 cursor-pointer ${
                              selectedTopic.title === item.title ? 'font-semibold text-gray-800' : 'text-gray-500'
                            } transition transform hover:-translate-y-1`}
                            onClick={() => setSelectedTopic(item)}
                          >
                            {getIcon(item.type)}
                            {item.title}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex-grow p-4">
        <h1 className="text-xl font-bold">{selectedTopic.title}</h1>
        <div className="mt-4">{selectedTopic.content}</div>
      </div>
    </div>
  );
};

export default Sidebar;
