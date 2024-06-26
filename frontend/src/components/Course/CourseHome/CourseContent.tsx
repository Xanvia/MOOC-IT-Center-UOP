"use client";
import { useState } from "react";

interface AccordionItem {
  title: string;
  content: string;
}

const accordionData: AccordionItem[] = [
  {
    title: "Introduction to jQuery",
    content:
      "Beginner-friendly course that teaches the basics of using jQuery, a popular JavaScript library. Learn how to make asynchronous requests using AJAX.Beginner-friendly co the basics of using jQuery, a popular JavaScript library.",
  },
  {
    title: "Introduction to AJAX",
    content:
      "Learn how to make asynchronous requests using AJAX.Beginner-friendly course that teaches the basics of using jQuery, a popular JavaScript library. the basics of using jQuery, a popular JavaScript library.",
  },
  {
    title: "Single Page Applications (SPAs)",
    content:
      "Understand the principles behind SPAs and how they work. Learn how to make asynchronous requests using AJAX.Beginner-friendly co Learn how to make asynchronous requests using AJAX.Beginner-friendly co the basics of using jQuery, a popular JavaScript library.",
  },
  {
    title: "Angular as a SPA Framework",
    content:
      "Learn how to use Angular for building SPAs. Learn how to make asynchronous requests using AJAX.Beginner-friendly co Learn how to make asynchronous requests using AJAX.Beginner-friendly co the basics of using jQuery, a popular JavaScript library.",
  },
];

const CourseContent: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);


  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 xl:mx-12 my-24 md:mx-28 mx-10 lg:mx-40">
        <div>
          <h1 className="text-3xl text-center font-bold text-primary">
            Course Content
          </h1>
        </div>
        <div className="xl:mr-56 pt-10 xl-pt-0">
          <div>
            {accordionData.map((item, index) => (
              <div key={index}>
                <div
                  className="flex justify-between text-primary cursor-pointer mb-8 pb-2 border-b border-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => handleToggle(index)}
                >
                  <span className={`${
                      activeIndex === index
                        ? "font-bold"
                        : "font"
                    } transition-all duration-100`}
                  >
                    {index + 1 < 10 ? `0${index + 1}.` : index + 1} {item.title}.
                  </span>

                  <span>{activeIndex === index ? "x" : "+"}</span>
                </div>
                {activeIndex === index && (
                  <div style={{ paddingLeft: "32px", marginBottom: "44px" }}>
                    {item.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
