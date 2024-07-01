"use client";
import React, { useState, useCallback } from "react";
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
  const [newTopicName, setNewTopicName] = useState<string>('');
  const [showNewTopicInput, setShowNewTopicInput] = useState<number | null>(null);
  const [newItemName, setNewItemName] = useState<string>('');
  const [showNewItemInput, setShowNewItemInput] = useState<{ weekIndex: number | null, chapterIndex: number | null }>({ weekIndex: null, chapterIndex: null });
  const [newItemType, setNewItemType] = useState<string>('video');

  const toggleWeek = useCallback((weekIndex: number) => {
    setExpandedWeek(expandedWeek === weekIndex ? null : weekIndex);
  }, [expandedWeek]);

  const toggleSubtopic = useCallback((weekIndex: number, subtopicIndex: number) => {
    setExpandedSubtopics(prev => ({
      ...prev,
      [weekIndex]: {
        ...(prev[weekIndex] || {}),
        [subtopicIndex]: !(prev[weekIndex]?.[subtopicIndex]),
      },
    }));
  }, []);

  const addNewWeek = useCallback(() => {
    setWeeks(prevWeeks => [
      ...prevWeeks,
      { weekname: `Week ${prevWeeks.length + 1}`, chapters: [] },
    ]);
  }, []);

  const handleAddNewTopic = useCallback((weekIndex: number) => {
    if (newTopicName.trim() !== '') {
      setWeeks(prevWeeks => {
        const newWeeks = [...prevWeeks];
        const newChapters = [...newWeeks[weekIndex].chapters, { title: newTopicName, items: [] }];
        newWeeks[weekIndex] = { ...newWeeks[weekIndex], chapters: newChapters };
        return newWeeks;
      });
      setNewTopicName('');
      setShowNewTopicInput(null);
    }
  }, [newTopicName]);

  const handleAddNewItem = useCallback((weekIndex: number, chapterIndex: number) => {
    if (newItemName.trim() !== '') {
      setWeeks(prevWeeks => {
        const newWeeks = [...prevWeeks];
        const newItems = [...newWeeks[weekIndex].chapters[chapterIndex].items, { title: newItemName, type: newItemType }];
        newWeeks[weekIndex].chapters[chapterIndex] = { ...newWeeks[weekIndex].chapters[chapterIndex], items: newItems };
        return newWeeks;
      });
      setNewItemName('');
      setNewItemType('video');
      setShowNewItemInput({ weekIndex: null, chapterIndex: null });
    }
  }, [newItemName, newItemType]);

  const handleTopicKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, weekIndex: number) => {
    if (e.key === 'Enter') {
      handleAddNewTopic(weekIndex);
    }
  };

  const handleItemKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, weekIndex: number, chapterIndex: number) => {
    if (e.key === 'Enter') {
      handleAddNewItem(weekIndex, chapterIndex);
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
                            <div key={itemIndex} className="flex items-center">
                              <p
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
                            </div>
                          ))}
                          {showNewItemInput.weekIndex === weekIndex && showNewItemInput.chapterIndex === chapterIndex ? (
                            <div className="flex items-center ml-8 mt-4">
                              <input
                                type="text"
                                className="border rounded p-2 w-full"
                                value={newItemName}
                                onChange={(e) => setNewItemName(e.target.value)}
                                onKeyPress={(e) => handleItemKeyPress(e, weekIndex, chapterIndex)}
                                placeholder="Enter item name"
                              />
                              <select
                                className="border rounded ml-2 p-2"
                                value={newItemType}
                                onChange={(e) => setNewItemType(e.target.value)}
                              >
                                <option value="video">Video</option>
                                <option value="article">Article</option>
                                <option value="quiz">Quiz</option>
                              </select>
                              <button
                                className="ml-2 bg-blue-500 text-white p-2 rounded"
                                onClick={() => handleAddNewItem(weekIndex, chapterIndex)}
                              >
                                <FaPlus />
                              </button>
                            </div>
                          ) : (
                            <button
                              className="ml-8 mt-4 text-blue-500 hover:underline flex items-center"
                              onClick={() => setShowNewItemInput({ weekIndex, chapterIndex })}
                            >
                              <FaPlus className="mr-1" /> Add Item
                            </button>
                          )}
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
                      onKeyPress={(e) => handleTopicKeyPress(e, weekIndex)}
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
                    className="ml-4 mt-4 text-blue-500 hover:underline"
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
