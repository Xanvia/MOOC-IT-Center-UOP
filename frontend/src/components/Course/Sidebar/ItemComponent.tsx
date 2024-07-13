import React, { useState } from "react";
import { Item } from "@/components/Course/types";
import SideBarIcon from "@/icons/sideBarIcon";
import { FaTrash } from "react-icons/fa";
import ConfirmDeleteModal from "../Modals/ConfrimDeleteModal";

interface ItemComponentProps {
  weekIndex: number;
  chapterIndex: number;
  itemIndex: number;
  item: Item;
  removeItem: (
    weekIndex: number,
    chapterIndex: number,
    itemIndex: number,
    itemId: string
  ) => void;
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

  const handleDelete = () => {
    const itemId = item.id || "";
    removeItem(weekIndex, chapterIndex, itemIndex, itemId as string);
    setShowModal(false);
  };

  return (
    <div className="flex items-center justify-between">
      <p
        className={`my-2 ml-8 cursor-pointer ${
          isSelected ? "font-semibold text-gray-800" : "text-gray-500"
        } `}
        onClick={handleSelect}
      >
        <SideBarIcon type={item.type} />
        {item.name}
      </p>
      <button
        className="ml-2 bg-slate-400 text-white p-1 rounded hover:bg-slate-600"
        onClick={() => setShowModal(true)}
      >
        <FaTrash />
      </button>

      {showModal && (
        <ConfirmDeleteModal
          setShowModal={setShowModal}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default ItemComponent;
