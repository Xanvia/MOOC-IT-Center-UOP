import React, { useState, useCallback } from 'react';
import { Chapter, Item } from '@/components/Course/types';
import { FaChevronRight, FaChevronDown, FaPlus } from 'react-icons/fa';
import ItemComponent from './ItemComponent';

interface ChapterComponentProps {
  weekIndex: number;
  chapterIndex: number;
  chapter: Chapter;
  expanded: boolean;
  toggleSubtopic: (weekIndex: number, chapterIndex: number) => void;
  addItem: (weekIndex: number, chapterIndex: number, item: Item) => void;
  selectedTopic: Item | null;
  setSelectedTopic: (item: Item) => void;
}

const ChapterComponent: React.FC<ChapterComponentProps> = ({
  weekIndex,
  chapterIndex,
  chapter,
  expanded,
  toggleSubtopic,
  addItem,
  selectedTopic,
  setSelectedTopic,
}) => {
  const [newItemName, setNewItemName] = useState<string>('');
  const [showNewItemInput, setShowNewItemInput] = useState<boolean>(false);
  const [newItemType, setNewItemType] = useState<string>('video');

  const handleAddNewItem = useCallback(() => {
    if (newItemName.trim() !== '') {
      addItem(weekIndex, chapterIndex, { title: newItemName, type: newItemType as 'video' | 'note' | 'quiz', content: '' });
      setNewItemName('');
      setNewItemType('video');
      setShowNewItemInput(false);
    }
  }, [newItemName, newItemType, weekIndex, chapterIndex, addItem]);

  const handleItemKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddNewItem();
    }
  };

  return (
    <div>
      <h5
        className="font-medium ml-4 my-4 cursor-pointer flex items-center max-w-48 leading-tight"
        onClick={() => toggleSubtopic(weekIndex, chapterIndex)}
      >
        {expanded ? <FaChevronDown className="mr-2" /> : <FaChevronRight className="mr-2" />}
        {chapter.title}
      </h5>
      {expanded && (
        <div>
          {chapter.items?.map((item, itemIndex) => (
            <ItemComponent
              key={itemIndex}
              item={item}
              isSelected={selectedTopic?.title === item.title}
              onSelect={() => setSelectedTopic(item)}
            />
          ))}
          {showNewItemInput ? (
            <div className="flex items-center ml-8 my-4">
              <input
                type="text"
                className="border rounded p-2 w-full"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="Enter item name"
              />
              <select
                className="border rounded ml-2 text-sm p-2"
                value={newItemType}
                onChange={(e) => setNewItemType(e.target.value)}
              >
                <option value="video">Video</option>
                <option value="note">Note</option>
                <option value="quiz">Quiz</option>
              </select>
              <button className="ml-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-800" onClick={handleAddNewItem}>
                <FaPlus />
              </button>
            </div>
          ) : (
            <button
              className="w-44 my-4 ml-8 px-4 py-2 bg-blue-200 text-black text-sm font-semibold rounded hover:bg-blue-400"
              onClick={() => setShowNewItemInput(true)}
            >
              Add Item +
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ChapterComponent;
