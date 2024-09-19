import React, { useState } from "react";
import { Item, Permissions } from "@/components/Course/types";
import SideBarIcon from "@/icons/sideBarIcon";
import { FaCheck, FaTrash } from "react-icons/fa";
import ConfirmDeleteModal from "../Modals/ConfrimDeleteModal";
import { useGlobal } from "@/contexts/store";
import { CircleCheck, CircleEllipsisIcon, FileLock, Trash } from "lucide-react";

interface ItemComponentProps {
  weekIndex: number;
  chapterIndex: number;
  itemIndex: number;
  item: Item;
  removeItem: (
    weekIndex: number,
    chapterIndex: number,
    itemIndex: number,
    itemId: string,
    itemType: "Note" | "Video" | "Quiz"
  ) => void;
  selectedTopic: Item | null;
  setSelectedTopic: (item: Item) => void;
  permissions: Permissions;
}

const ItemComponent: React.FC<ItemComponentProps> = ({
  weekIndex,
  chapterIndex,
  itemIndex,
  item,
  removeItem,
  selectedTopic,
  setSelectedTopic,
  permissions,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const isSelected = selectedTopic === item;
  const { userRole } = useGlobal();

  const handleSelect = () => {
    if (item.has_started || userRole === "teacher") {
      setSelectedTopic(item);
    }
  };

  const handleDelete = () => {
    const itemId = item.id || "";
    removeItem(weekIndex, chapterIndex, itemIndex, itemId as string, item.type);
    setShowModal(false);
  };

  return (
    <div className="flex items-center justify-between">
      <p
        className={`my-2 ml-8 cursor-pointer ${
          isSelected
            ? "font-semibold text-gray-800"
            : item.completed
            ? "text-purple-900"
            : "text-gray-500"
        }`}
        onClick={handleSelect}
      >
        <SideBarIcon type={item.type} />
        {item.name}
      </p>
      {permissions.canDelete && (
        <button
        className="ml-2 text-red-500 rounded hover:bg-red-200"
          onClick={() => setShowModal(true)}
        >
          <Trash size={16} />
        </button>
      )}
      {userRole === "student" ? (
        item.completed ? (
          <CircleCheck className="text-green-500 stroke-[1.5] size-5" />
        ) : item.has_started ? (
          <CircleEllipsisIcon className="text-blue-500 stroke-[1.5] size-5" />
        ) : (
          <FileLock className="text-red-700 stroke-[1.5] size-5" />
        )
      ) : null}
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
