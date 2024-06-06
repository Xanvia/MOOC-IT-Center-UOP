import React from 'react';

interface Syllabus {
  week: string;
  topic: string;
  description: string;
}

const syllabusData: Syllabus[] = [
  {
    week: 'Week 1',
    topic: 'Introduction to Programming',
    description: 'In this week, we will cover the basics of programming...',
  },
  // Add more syllabus data as needed
];

const SyllabusTab: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 bg-white rounded-lg">
      {syllabusData.map((syllabus, index) => (
        <div key={index} className="p-4 rounded shadow flex flex-col md:flex-row md:justify-between">
          <div>
            <h2 className="text-xl font-bold">{syllabus.week}</h2>
            <p><strong>Topic:</strong> {syllabus.topic}</p>
          </div>
          <p>{syllabus.description}</p>
        </div>
      ))}
    </div>
  );
};

export default SyllabusTab;