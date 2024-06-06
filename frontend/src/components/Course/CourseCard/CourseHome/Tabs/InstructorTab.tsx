import React from 'react';

interface Instructor {
  name: string;
  country: string;
  university: string;
  duration: string;
  subjectArea: string;
  description: string;
}

const instructors: Instructor[] = [
  {
    name: 'John Doe',
    country: 'USA',
    university: 'Harvard',
    duration: '10 years',
    subjectArea: 'Computer Science',
    description: 'John Doe is a highly experienced instructor...',
  },
  // Add more instructors as needed
];

const InstructorTab: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 bg-white rounded-lg">
      {instructors.map((instructor, index) => (
        <div key={index} className="p-4  rounded shadow flex  md:flex-row md:justify-between">
          <div>
            <h2 className="text-xl font-bold">{instructor.name}</h2>
            <p><strong>Country:</strong> {instructor.country}</p>
            <p><strong>University:</strong> {instructor.university}</p>
          </div>
          <div>
            <p><strong>Duration:</strong> {instructor.duration}</p>
            <p><strong>Subject Area:</strong> {instructor.subjectArea}</p>
          </div>
          <p>{instructor.description}</p>
        </div>
      ))}
    </div>
  );
};

export default InstructorTab;