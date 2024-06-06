"use client";
import React, { lazy, useState } from "react";

const DescriptionTab = lazy(() => import("./DescriptionTab"));
const InstructorTab = lazy(() => import("./InstructorTab"));
const SyllabusTab = lazy(() => import("./SyllabusTab"));
const OutcomesTab = lazy(() => import("./OutcomesTab"));

const CourseDetailsTabs = () => {
  const [activeTab, setActiveTab] = useState("Description");

  const tabs = [
    {
      name: "Description",
      content: <DescriptionTab />,
    },
    { name: "Instructor", content: <InstructorTab /> },
    { name: "Syllabus", content: <SyllabusTab /> },
    { name: "Outcomes", content: <OutcomesTab /> },
  ];

  return (
    <div className="w-full">
      <div className="flex border-b justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`xl:mx-16 md:mx-8 px-1 sm:px-8 py-2  font-semibold text-gray-700 border-b-2 transition-colors duration-300 ${
              activeTab === tab.name
                ? "border-blue-800 text-blue-500"
                : "border-transparent hover:border-gray-300"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="lg:mx-32">
        {tabs.map(
          (tab) =>
            activeTab === tab.name && (
              <div
                key={tab.name}
                className="py-14 px-3 sm:px-20 xl:mx-28  text-left bg-primary_light"
              >
                {tab.content}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default CourseDetailsTabs;
