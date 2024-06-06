import React from 'react';

const outcomes = [
  'Understand the basics of programming',
  'Be able to build simple web applications',
  'Understand how to work with databases',
  // Add more outcomes as needed
];

const OutcomesTab: React.FC = () => {
  return (
    <ul className="list-disc pl-5">
      {outcomes.map((outcome, index) => (
        <li key={index}>{outcome}</li>
      ))}
    </ul>
  );
};

export default OutcomesTab;