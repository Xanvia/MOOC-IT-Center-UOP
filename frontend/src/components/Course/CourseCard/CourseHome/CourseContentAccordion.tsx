"use client";
import { useState } from 'react';

interface AccordionItem {
  title: string;
  content: string;
}

const accordionData: AccordionItem[] = [
  {
    title: "Introduction to jQuery",
    content: "Beginner-friendly course that teaches the basics of using jQuery, a popular JavaScript library."
  },
  {
    title: "Introduction to AJAX",
    content: "Learn how to make asynchronous requests using AJAX."
  },
  {
    title: "Single Page Applications (SPAs)",
    content: "Understand the principles behind SPAs and how they work."
  },
  {
    title: "Angular as a SPA Framework",
    content: "Learn how to use Angular for building SPAs."
  }
];

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
      {accordionData.map((item, index) => (
        <div key={index}>
          <div 
            style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer', marginBottom: '8px' }}
            onClick={() => handleToggle(index)}
          >
            <span>{index + 1 < 10 ? `0${index + 1}` : index + 1} {item.title}</span>
            <span>{activeIndex === index ? 'x' : '+'}</span>
          </div>
          {activeIndex === index && (
            <div style={{ paddingLeft: '20px', marginBottom: '8px' }}>
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
