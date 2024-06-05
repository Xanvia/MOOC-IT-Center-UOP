"use client";
import { useState } from 'react';
import Image from "next/image";

const headerImage = "/images/course-header.jpg";

const CourseDetailsTabs = () => {
  const [activeTab, setActiveTab] = useState('Description');

  const tabs = [
    {  
        name: 'Description', 
        content: (
        <div>
            <br/>
            <h1 className="text-2xl font-semibold">About the Course</h1>
            <br/>
            <p>Web programming or web development is a term closely related to websites and the internet. Why is that? Because web programming is one of the processes involved in creating websites for internet purposes, which are commonly referred to as the World Wide Web (WWW). The term WWW is well-known because it is, after all, the most popular internet service today.</p>
            <br/>
            <p>In this course, you will be taught how to create websites with industry standards. Web programming or web development is a term closely related to websites and the internet. Web programming or web development is a term closely related to websites and the internet.Here, you will learn about HTML, CSS, and JavaScript, which are the fundamental foundations in website development. Web programming or web development is a term closely related to websites and the internet. Why is that? Because web programming is one of the processes involved in creating websites for internet purposes, which are commonly referred to as the World Wide Web (WWW). The term WWW is well-known because it is, after all, the most popular internet service today.</p>
            <div>
            <Image
                    src={headerImage}
                    alt="Computer"
                    layout="fil"
                    width={1000}
                    height={500}
                    className="mt-4"
                />
            </div>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            Click Me
            </button> 
            
        </div>
        ) 
    },
    { name: 'Instructor', content: 'Content for Instructor' },
    { name: 'Syllabus', content: 'Content for Syllabus' },
    { name: 'Prerequisites', content: 'Content for Prerequisites' },
  ];

  return (
    <div className="w-full">
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`ml-12 px-8 py-2 -mb-px  font-semibold text-gray-700 border-b-2 transition-colors duration-300 ${
              activeTab === tab.name
                ? 'border-blue-800 text-blue-500'
                : 'border-transparent hover:border-gray-300'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="p-4">
        {tabs.map(
          (tab) =>
            activeTab === tab.name && (
              <div key={tab.name}>
                <p>{tab.content}</p>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default CourseDetailsTabs;
