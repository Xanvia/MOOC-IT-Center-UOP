"use client";
import React, { useState } from "react";
import { useSelectedTopic } from "@/contexts/SidebarContext";
import { initialWeeks } from "@/data/coursedata";
import { Week } from "@/components/Course/types";

const getIcon = (type: string) => {
  switch (type) {
    case "video":
      return (
        <svg
          className="h-5 w-5 inline-block mr-2"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polygon points="10 8 16 12 10 16 10 8" />
        </svg>
      );
    case "note":
      return (
        <svg
          className="h-5 w-5 inline-block mr-2 m"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      );
    case "quiz":
      return (
        <svg
          className="h-5 w-5 inline-block mr-2"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <path d="M14 3v4a1 1 0 0 0 1 1h4" />
          <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
          <path d="M9 15l2 2l4 -4" />
        </svg>
      );
    default:
      return null;
  }
};

const Sidebar: React.FC = () => {
  const { selectedTopic, setSelectedTopic } = useSelectedTopic();
  const [weeks, setWeeks] = useState<Week[]>(initialWeeks);
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);
  const [expandedSubtopics, setExpandedSubtopics] = useState<{
    [weekIndex: number]: { [subtopicIndex: number]: boolean };
  }>({});

  const toggleWeek = (weekIndex: number) => {
    setExpandedWeek(expandedWeek === weekIndex ? null : weekIndex);
  };

  const toggleSubtopic = (weekIndex: number, subtopicIndex: number) => {
    setExpandedSubtopics((prev) => ({
      ...prev,
      [weekIndex]: {
        ...prev[weekIndex],
        [subtopicIndex]: !(prev[weekIndex] && prev[weekIndex][subtopicIndex]),
      },
    }));
  };

  const addNewWeek = () => {
    setWeeks((prevWeeks) => [
      ...prevWeeks,
      { weekname: `Week ${prevWeeks.length + 1}`, subtopics: [] },
    ]);
  };

  const addNewTopic = (weekIndex: number) => {
    setWeeks((prevWeeks) => {
      const newWeeks = [...prevWeeks];
      const newSubtopics = [...newWeeks[weekIndex].subtopics];
      newSubtopics.push({
        title: `New Topic ${newSubtopics.length + 1}`,
        items: [],
      });
      newWeeks[weekIndex] = {
        ...newWeeks[weekIndex],
        subtopics: newSubtopics,
      };
      return newWeeks;
    });
  };

  return (
    <div className="flex">
      <div className="w-84 p-8 border-r bg-white border-gray-200">
        <div className="mt-4 mb-10">
          <h3 className="text-lg font-semibold">Progress</h3>
          <div className="relative h-2 mt-2 bg-gray-300 rounded">
            <div
              className="absolute top-0 left-0 h-full bg-blue-600 rounded"
              style={{ width: "20%" }}
            ></div>
          </div>
          <p className="my-2 text-sm text-gray-600">
            4 of the 20 videos have been completed
          </p>
        </div>
        {weeks.map((week, weekIndex) => (
          <div
            key={weekIndex}
            className="mb-8 mx-2 border-b pb-2 border-gray-200"
          >
            <h4
              className="text-md font-medium text-primary border-b pb-1 mb-2 border-gray-400 cursor-pointer"
              onClick={() => toggleWeek(weekIndex)}
            >
              {week.weekname}
            </h4>
            {expandedWeek === weekIndex && (
              <div>
                {week.subtopics.map((subtopic, subtopicIndex) => (
                  <div key={subtopicIndex}>
                    <h5
                      className="text-md font-medium ml-4 my-4 cursor-pointer"
                      onClick={() => toggleSubtopic(weekIndex, subtopicIndex)}
                    >
                      {subtopic.title}
                    </h5>
                    {expandedSubtopics[weekIndex] &&
                      expandedSubtopics[weekIndex][subtopicIndex] && (
                        <div>
                          {subtopic.items?.map((item, itemIndex) => (
                            <p
                              key={itemIndex}
                              className={`mt-4 ml-8 cursor-pointer ${
                                selectedTopic.title === item.title
                                  ? "font-semibold text-gray-800"
                                  : "text-gray-500"
                              } transition transform hover:-translate-y-1`}
                              onClick={() => setSelectedTopic(item)}
                            >
                              {getIcon(item.type)}
                              {item.title}
                            </p>
                          ))}
                        </div>
                      )}
                  </div>
                ))}
                <button
                  className="w-2/3 ml-4 mt-2 px-2 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-700"
                  onClick={() => addNewTopic(weekIndex)}
                >
                  Add Topic +
                </button>
              </div>
            )}
          </div>
        ))}
        <button
          className="w-full mt-4 px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-700"
          onClick={addNewWeek}
        >
          Add Week +
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
