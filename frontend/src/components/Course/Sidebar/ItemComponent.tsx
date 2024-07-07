import React, { useState } from 'react';
import { Item } from '@/components/Course/types';
import SideBarIcon from '@/icons/sideBarIcon';
import { FaTrash } from 'react-icons/fa';

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
  const [showModal, setShowModal] = useState<boolean>(false);
  const isSelected = selectedTopic === item;

  const handleSelect = () => {
    setSelectedTopic(item);
  };

  const handleRemove = () => {
    removeItem(weekIndex, chapterIndex, itemIndex);
    setShowModal(false);
  };

  return (
    <div className="flex items-center justify-between">
      <p
        className={`my-2 ml-8 cursor-pointer ${isSelected ? 'font-semibold text-gray-800' : 'text-gray-500'} `}
        onClick={handleSelect}
      >
        <SideBarIcon type={item.type} />
        {item.title}
      </p>
      <button
        className="ml-2 bg-slate-400 text-white p-1 rounded hover:bg-slate-600"
        onClick={() => setShowModal(true)}
      >
        <FaTrash />
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <p>Are you sure you want to delete this item?</p>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800 mr-2"
                onClick={handleRemove}
              >
                Delete
              </button>
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-800"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemComponent;
