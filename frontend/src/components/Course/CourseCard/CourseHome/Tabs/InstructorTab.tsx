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
    <div className="lg:mx-32">
      <div className="py-14 px-3 sm:px-20 xl:mx-28  text-left bg-primary_light">
    <div className="flex flex-col gap-4 bg-white rounded-lg">
      {instructors.map((instructor, index) => (
        <div key={index} className="p-4  rounded shadow  md:flex-row md:justify-between">
          <div className='flex space-x-12 py-2'>
            <div className='px-4'>
              <img
                src="https://via.placeholder.com/150"
                alt="Instructor"
                className="w-21 h-21 object-cover rounded-full"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold pb-3">{instructor.name}</h2>
              <p><strong>Country:</strong> {instructor.country}</p>
              <p><strong>University:</strong> {instructor.university}</p>
              <p><strong>Duration:</strong> {instructor.duration}</p>
              <p><strong>Subject Area:</strong> {instructor.subjectArea}</p>
            </div>
          </div>
          
          <div className="mt-4 py-4 px-4 border-t border-gray-300">
            <p>{instructor.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
  );
};

export default InstructorTab;