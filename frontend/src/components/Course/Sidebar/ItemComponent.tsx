import React from 'react';
import { Item } from '@/components/Course/types';
import SideBarIcon from '@/icons/sideBarIcon';
import { FaChevronRight, FaChevronDown, FaPlus, FaTrash } from 'react-icons/fa';

interface ItemComponentProps {
  weekIndex: number;
  chapterIndex: number;
  itemIndex: number;
  item: Item;
  removeItem: (weekIndex: number, chapterIndex: number, itemIndex: number) => void;
  selectedTopic: Item | null;
  setSelectedTopic: (item: Item) => void;
}

const ItemComponent: React.FC<ItemComponentProps> = ({
  weekIndex,
  chapterIndex,
  itemIndex,
  item,
  removeItem,
  selectedTopic,
  setSelectedTopic,
}) => {
  const isSelected = selectedTopic === item;

  const handleSelect = () => {
    setSelectedTopic(item);
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    removeItem(weekIndex, chapterIndex, itemIndex);
  };

  return (
    <div className="flex items-center">
      <p
        className={`my-2 ml-8 cursor-pointer ${isSelected ? 'font-semibold text-gray-800' : 'text-gray-500'} `}
        onClick={handleSelect}
      >
        <SideBarIcon type={item.type} />
        {item.title}
      </p>
      <button
        className="ml-7 bg-slate-400 text-white p-1 rounded hover:bg-slate-600"
        onClick={handleRemove}
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default ItemComponent;
