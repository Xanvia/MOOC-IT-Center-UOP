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
    <>
      <div className="w-full">
        <div className="grid grid-cols-2 gap-2 mx-12 my-24 center">
          <div>
            <h1 className="text-3xl text-center font-bold text-primary">
              Course Content
            </h1>
          </div>
          <div className="mr-56">
            <div className="">
              <div className=" ">
                {accordionData.map((item, index) => (
                  <div key={index}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        marginBottom: "32px",
                        borderBottom: "1px solid black",
                        paddingBottom: "8px",
                      }}
                      onClick={() => handleToggle(index)}
                    >
                      <span
                        style={{
                          color: activeIndex === index ? "blue" : "black",
                        }}
                      >
                        {index + 1 < 10 ? `0${index + 1}.` : index + 1}{" "}
                        {item.title}.
                      </span>

                      <span>{activeIndex === index ? "x" : "+"}</span>
                    </div>
                    {activeIndex === index && (
                      <div
                        style={{ paddingLeft: "32px", marginBottom: "44px" }}
                      >
                        {item.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseContent;
