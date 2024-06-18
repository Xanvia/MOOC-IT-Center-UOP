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
         <div key={index} className="p-4  rounded shadow md:flex-row md:justify-between">
            <div className="flex space-x-10">
                
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{instructor.name}</h2>
                  <p><strong>Country:</strong> {instructor.country}</p>
                  <p><strong>University:</strong> {instructor.university}</p>
                  <p><strong>Duration:</strong> {instructor.duration}</p>
                  <p><strong>Subject Area:</strong> {instructor.subjectArea}</p>
                </div> 
              </div>
              <div className="border-t border-gray-200">
                <div className="px-6 py-4">
                  <p>{instructor.description}</p>
                </div>
              </div>
          </div>              
       ))}
     </div>
   </div>
 </div>
  );
};

export default InstructorTab;