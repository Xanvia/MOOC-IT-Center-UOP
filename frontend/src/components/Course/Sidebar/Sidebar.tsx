"use client";
import React, { useState } from "react";
import { useSelectedTopic } from "@/contexts/SidebarContext";
import { initialWeeks } from "@/data/coursedata";
import { Week } from "@/components/Course/types";
import SideBarIcon from "@/icons/sideBarIcon";
import { FaPlus } from "react-icons/fa";

const Sidebar: React.FC = () => {
  const { selectedTopic, setSelectedTopic } = useSelectedTopic();
  const [weeks, setWeeks] = useState<Week[]>(initialWeeks);
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);
  const [expandedSubtopics, setExpandedSubtopics] = useState<{
    [weekIndex: number]: { [subtopicIndex: number]: boolean };
  }>({});
  const [newTopicName, setNewTopicName] = useState<string>("");
  const [showNewTopicInput, setShowNewTopicInput] = useState<number | null>(
    null
  );

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
      { weekname: `Week ${prevWeeks.length + 1}`, chapters: [] },
    ]);
  };

  const handleAddNewTopic = (weekIndex: number) => {
    if (newTopicName.trim() !== "") {
      setWeeks((prevWeeks) => {
        const newWeeks = [...prevWeeks];
        const newChapters = [...newWeeks[weekIndex].chapters];
        newChapters.push({
          title: newTopicName,
          items: [],
        });
        newWeeks[weekIndex] = {
          ...newWeeks[weekIndex],
          chapters: newChapters,
        };
        return newWeeks;
      });
      setNewTopicName("");
      setShowNewTopicInput(null);
    }
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    weekIndex: number
  ) => {
    if (e.key === "Enter") {
      handleAddNewTopic(weekIndex);
    }
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
          <div key={weekIndex} className="mb-8 mx-2 pb-2">
            <h4
              className="text-md font-medium text-primary pb-1 mb-2 cursor-pointer"
              onClick={() => toggleWeek(weekIndex)}
            >
              {week.weekname}
            </h4>
            {expandedWeek === weekIndex && (
              <div>
                {week.chapters.map((chapter, chapterIndex) => (
                  <div key={chapterIndex}>
                    <h5
                      className="font-medium ml-4 my-4 cursor-pointer max-w-48 leading-tight"
                      onClick={() => toggleSubtopic(weekIndex, chapterIndex)}
                    >
                      {chapter.title}
                    </h5>
                    {expandedSubtopics[weekIndex] &&
                      expandedSubtopics[weekIndex][chapterIndex] && (
                        <div>
                          {chapter.items?.map((item, itemIndex) => (
                            <p
                              key={itemIndex}
                              className={`mt-4 ml-8 cursor-pointer ${
                                selectedTopic.title === item.title
                                  ? "font-semibold text-gray-800"
                                  : "text-gray-500"
                              } `}
                              onClick={() => setSelectedTopic(item)}
                            >
                              <SideBarIcon type={item.type} />
                              {item.title}
                            </p>
                          ))}
                        </div>
                      )}
                  </div>
                ))}
                {showNewTopicInput === weekIndex ? (
                  <div className="flex ml-4 mt-4">
                    <input
                      type="text"
                      className="border rounded p-2 w-full"
                      value={newTopicName}
                      onChange={(e) => setNewTopicName(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, weekIndex)}
                      placeholder="Enter topic name"
                    />
                    <button
                      className="ml-2 bg-blue-500 text-white p-2 rounded"
                      onClick={() => handleAddNewTopic(weekIndex)}
                    >
                      <FaPlus />
                    </button>
                  </div>
                ) : (
                  <button
                    className="ml-4 mt-4 text-blue-500"
                    onClick={() => setShowNewTopicInput(weekIndex)}
                  >
                    Add Topic +
                  </button>
                )}
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
