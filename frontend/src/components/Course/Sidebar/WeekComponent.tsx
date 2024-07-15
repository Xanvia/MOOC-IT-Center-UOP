import React, { useState, useCallback } from "react";
import { Week, Item } from "@/components/Course/types";
import { FaChevronRight, FaChevronDown, FaPlus, FaTrash } from "react-icons/fa";
import ChapterComponent from "./ChapterComponent";
import ConfirmDeleteModal from "../Modals/ConfrimDeleteModal";
import { useSelectedTopic } from "@/contexts/SidebarContext";

interface WeekComponentProps {
  weekIndex: number;
  week: Week;
  expanded: boolean;
  toggleWeek: (weekIndex: number) => void;
  addTopic: (weekIndex: number, topicName: string, weekId: string) => void;
  addItem: (
    weekIndex: number,
    chapterIndex: number,
    chapterId: string,
    item: Item
  ) => void;
  removeItem: (
    weekIndex: number,
    chapterIndex: number,
    itemIndex: number,
    itemId: string
  ) => void;
  removeTopic: (
    weekIndex: number,
    chapterIndex: number,
    chapterId: string
  ) => void;
  removeWeek: (weekIndex: number, weekId: string) => void;
  selectedTopic: Item | null;
  setSelectedTopic: (item: Item) => void;
  isLastWeek: boolean;
}

const WeekComponent: React.FC<WeekComponentProps> = ({
  weekIndex,
  week,
  expanded,
  toggleWeek,
  addTopic,
  addItem,
  removeItem,
  removeTopic,
  removeWeek,
  isLastWeek,
}) => {
  const [newTopicName, setNewTopicName] = useState<string>("");
  const [showNewTopicInput, setShowNewTopicInput] = useState<boolean>(false);

  const {
    selectedTopic,
    setSelectedTopic,
    setExpandedSubtopics,
    expandedSubtopics,
  } = useSelectedTopic();

  const [showModal, setShowModal] = useState<boolean>(false);
  const toggleSubtopic = useCallback((chapterIndex: number) => {
    setExpandedSubtopics((prev) => ({
      ...prev,
      [chapterIndex]: !prev[chapterIndex],
    }));
  }, []);

  const handleAddNewTopic = useCallback(() => {
    const weekId = week.id || "";
    if (newTopicName.trim() !== "") {
      addTopic(weekIndex, newTopicName, weekId as string);
      setNewTopicName("");
      setShowNewTopicInput(false);
    }
  }, [newTopicName, weekIndex, addTopic]);

  const handleTopicKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddNewTopic();
    }
  };

  const handleDelete = () => {
    const weekId = week.id || "";
    removeWeek(weekIndex, weekId as string);
    setShowModal(false);
  };

  return (
    <div className="mb-8 mx-2 pb-2">
      <div className="flex items-center justify-between">
        <h4
          className="text-md font-medium text-primary pb-1 mb-2 cursor-pointer flex items-center"
          onClick={() => toggleWeek(weekIndex)}
        >
          {expanded ? (
            <FaChevronDown className="mr-2" />
          ) : (
            <FaChevronRight className="mr-2" />
          )}
          {week.name}
        </h4>
        {isLastWeek && ( // Conditionally render the delete button
          <button
            className="ml-2 bg-slate-400 text-white p-1 rounded hover:bg-slate-600"
            onClick={() => setShowModal(true)}
          >
            <FaTrash />
          </button>
        )}
      </div>
      {expanded && (
        <div>
          {week.chapters.map((chapter, chapterIndex) => (
            <ChapterComponent
              key={chapterIndex}
              weekIndex={weekIndex}
              chapterIndex={chapterIndex}
              chapter={chapter}
              expanded={!!expandedSubtopics[chapterIndex]}
              toggleSubtopic={toggleSubtopic}
              addItem={addItem}
              removeItem={removeItem}
              removeTopic={removeTopic}
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
            />
          ))}
          {showNewTopicInput ? (
            <div className="flex ml-4 mt-4">
              <input
                type="text"
                className="border rounded p-2 w-full"
                value={newTopicName}
                onChange={(e) => setNewTopicName(e.target.value)}
                onKeyPress={handleTopicKeyPress}
                placeholder="Enter topic name"
              />
              <button
                className="ml-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-800"
                onClick={handleAddNewTopic}
              >
                <FaPlus />
              </button>
            </div>
          ) : (
            <button
              className="w-60 mt-4 ml-5 px-4 py-2 bg-blue-200 text-black text-sm font-semibold rounded hover:bg-blue-400"
              onClick={() => setShowNewTopicInput(true)}
            >
              Add Topic +
            </button>
          )}
        </div>
      )}
      {showModal && (
        <ConfirmDeleteModal
          setShowModal={setShowModal}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default WeekComponent;
