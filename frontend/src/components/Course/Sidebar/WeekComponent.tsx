import React, { useState, useCallback } from 'react';
import { Week, Chapter, Item } from '@/components/Course/types';
import { FaChevronRight, FaChevronDown, FaPlus } from 'react-icons/fa';
import ChapterComponent from './ChapterComponent';

interface WeekComponentProps {
  weekIndex: number;
  week: Week;
  expanded: boolean;
  toggleWeek: (weekIndex: number) => void;
  addTopic: (weekIndex: number, topicName: string) => void;
  addItem: (weekIndex: number, chapterIndex: number, item: Item) => void;
  selectedTopic: Item | null;
  setSelectedTopic: (item: Item) => void;
}

const WeekComponent: React.FC<WeekComponentProps> = ({
  weekIndex,
  week,
  expanded,
  toggleWeek,
  addTopic,
  addItem,
  selectedTopic,
  setSelectedTopic,
}) => {
  const [newTopicName, setNewTopicName] = useState<string>('');
  const [showNewTopicInput, setShowNewTopicInput] = useState<boolean>(false);
  const [expandedSubtopics, setExpandedSubtopics] = useState<{ [subtopicIndex: number]: boolean }>({});

  const toggleSubtopic = useCallback(
    (chapterIndex: number) => {
      setExpandedSubtopics((prev) => ({
        ...prev,
        [chapterIndex]: !prev[chapterIndex],
      }));
    },
    []
  );

  const handleAddNewTopic = useCallback(() => {
    if (newTopicName.trim() !== '') {
      addTopic(weekIndex, newTopicName);
      setNewTopicName('');
      setShowNewTopicInput(false);
    }
  }, [newTopicName, weekIndex, addTopic]);

  const handleTopicKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddNewTopic();
    }
  };

  return (
    <div className="mb-8 mx-2 pb-2">
      <h4 className="text-md font-medium text-primary pb-1 mb-2 cursor-pointer flex items-center" onClick={() => toggleWeek(weekIndex)}>
        {expanded ? <FaChevronDown className="mr-2" /> : <FaChevronRight className="mr-2" />}
        {week.weekname}
      </h4>
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
              <button className="ml-2 bg-blue-500 text-white p-2 rounded" onClick={handleAddNewTopic}>
                <FaPlus />
              </button>
            </div>
          ) : (
            <button className="w-60 mt-4 px-4 py-2 bg-blue-200 text-black text-sm font-semibold rounded hover:bg-blue-400" onClick={() => setShowNewTopicInput(true)}>
              Add Topic +
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default WeekComponent;