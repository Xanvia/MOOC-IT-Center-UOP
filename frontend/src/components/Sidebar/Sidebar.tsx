"use client";
// components/Sidebar.tsx
import React, { useState } from 'react';

const topics = [
  {
    category: 'Intro',
    items: [{ title: 'Perkenalan instruktur', content: 'Content for Perkenalan instruktur' }],
  },
  {
    category: 'Installation',
    items: [
      { title: 'Download Tools', content: 'Content for Download Tools' },
      { title: 'Instalasi Tools', content: 'Content for Instalasi Tools' },
      { title: 'Basic Penggunaan Tools', content: 'Content for Basic Penggunaan Tools' },
    ],
  },
  {
    category: 'Basic HTML',
    items: [
      { title: 'Tentang HTML', content: 'Content for Tentang HTML' },
      { title: 'Menjalankan Kode', content: 'Content for Menjalankan Kode' },
      { title: 'Tag', content: 'Content for Tag' },
      { title: 'Header dan Paragraf', content: 'Content for Header dan Paragraf' },
      { title: 'List', content: 'Content for List' },
      { title: 'Table', content: 'Content for Table' },
    ],
  },
];

const Sidebar = () => {
  const [selectedTopic, setSelectedTopic] = useState(topics[0].items[0]);

  return (
    <div className="flex">
      <div className="w-64 p-4 border-r border-gray-200">
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Stats</h3>
          <div className="relative h-2 mt-2 bg-gray-300 rounded">
            <div className="absolute top-0 left-0 h-full bg-blue-600 rounded" style={{ width: '20%' }}></div>
          </div>
          <p className="mt-2 text-sm text-gray-600">4 dari 20 video telah selesai</p>
        </div>
        {topics.map((topic, index) => (
          <div key={index} className="mb-6">
            <h4 className="text-md font-medium">{topic.category}</h4>
            {topic.items.map((item, idx) => (
              <p
                key={idx}
                className={`mt-2 cursor-pointer ${
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
