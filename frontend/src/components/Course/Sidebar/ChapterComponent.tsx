import React, { useState, useCallback } from "react";
import { Chapter, Item, Permissions } from "@/components/Course/types";
import { FaChevronRight, FaChevronDown, FaPlus, FaTrash } from "react-icons/fa";
import Select, {
  SingleValueProps,
  StylesConfig,
  OptionProps,
} from "react-select";
import SideBarIcon from "@/icons/sideBarIcon";
import ItemComponent from "./ItemComponent";
import ConfirmDeleteModal from "../Modals/ConfrimDeleteModal";
import { useGlobal } from "@/contexts/store";
import { Trash } from "lucide-react";

interface ChapterComponentProps {
  weekIndex: number;
  chapterIndex: number;
  chapter: Chapter;
  expanded: boolean;
  toggleSubtopic: (chapterIndex: number) => void;
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
    itemId: string,
    itemType: "Note" | "Video" | "Quiz" | "Code",
  ) => void;
  removeTopic: (
    weekIndex: number,
    chapterIndex: number,
    chapterId: string
  ) => void;
  selectedTopic: Item | null;
  setSelectedTopic: (item: Item) => void;
  permissions: Permissions;
}

interface OptionType {
  value: string;
  label: string;
  type: string;
}

const ChapterComponent: React.FC<ChapterComponentProps> = ({
  weekIndex,
  chapterIndex,
  chapter,
  expanded,
  toggleSubtopic,
  addItem,
  removeItem,
  removeTopic,
  selectedTopic,
  setSelectedTopic,
  permissions,
}) => {
  const [newItemName, setNewItemName] = useState<string>("");
  const [showNewItemInput, setShowNewItemInput] = useState<boolean>(false);
  const [newItemType, setNewItemType] = useState<string>("Video");
  const [showModal, setShowModal] = useState<boolean>(false);
  const { userRole } = useGlobal();

  const options: OptionType[] = [
    { value: "Video", label: "Video", type: "Video" },
    { value: "Note", label: "Note", type: "Note" },
    { value: "Quiz", label: "Quiz", type: "Quiz" },
    { value: "Code", label: "Code", type: "Code" },
  ];

  const customSingleValue = ({ data }: SingleValueProps<OptionType>) => (
    <div className="custom-single-value flex items-center">
      <SideBarIcon type={data.type} />
    </div>
  );

  const customOption = (props: OptionProps<OptionType, false>) => (
    <div
      {...props.innerProps}
      className="custom-option flex items-center mt-2"
      title={props.data.type}
    >
      <SideBarIcon type={props.data.type} />
    </div>
  );

  const handleAddNewItem = useCallback(() => {
    const chapterId = chapter.id || "";
    if (newItemName.trim() !== "") {
      addItem(weekIndex, chapterIndex, chapterId as string, {
        id: 0,
        name: newItemName,
        type: newItemType as "Video" | "Note" | "Quiz" | "Code",
        content: "",
        has_started: false,
        completed: false,
      });
      setNewItemName("");
      setNewItemType("video");
      setShowNewItemInput(false);
    }
  }, [newItemName, newItemType, weekIndex, chapterIndex, addItem]);

  const handleItemKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddNewItem();
    }
  };

  const handleDelete = () => {
    const chapterId = chapter.id || "";
    removeTopic(weekIndex, chapterIndex, chapterId as string);
    setShowModal(false);
  };

  const customStyles: StylesConfig<OptionType, false> = {
    control: (provided) => ({
      ...provided,
      minHeight: "30px",
      height: "36px",
      width: "72px",
      padding: "0",
      alignItems: "center",
    }),
    singleValue: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
    option: (provided) => ({
      ...provided,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px 10px",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "4px",
    }),
    clearIndicator: (provided) => ({
      ...provided,
      padding: "4px",
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "0 6px",
      display: "flex",
      alignItems: "center",
    }),
    input: (provided) => ({
      ...provided,
      padding: "2px",
      margin: "0",
      display: "flex",
      alignItems: "center",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: "30px",
      display: "flex",
      alignItems: "center",
    }),
    menu: (provided) => ({
      ...provided,
      display: "flex",
      width: "44px",
      padding: "6px",
      paddingLeft: "10px",
      justifyContent: "center",
      alignItems: "center",
    }),
    menuList: (provided) => ({
      ...provided,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  return (
    <div className="ml-4 mb-4">
      <div className="flex items-center justify-between">
        <h5
          className="font-medium ml-4 my-4 cursor-pointer flex items-center max-w-48 leading-tight"
          onClick={() => toggleSubtopic(chapterIndex)}
        >
          {expanded ? (
            <FaChevronDown className="mr-2" />
          ) : (
            <FaChevronRight className="mr-2" />
          )}
          {chapter.name}
        </h5>
        {permissions.canDelete && (
          <button
            className="ml-2 text-red-500  rounded hover:bg-red-200"
            onClick={() => setShowModal(true)}
          >
            <Trash size={16} />
          </button>
        )}
      </div>
      {expanded && (
        <div>
          {chapter.items &&
            chapter.items.map((item, itemIndex) => (
              <ItemComponent
                key={itemIndex}
                weekIndex={weekIndex}
                chapterIndex={chapterIndex}
                itemIndex={itemIndex}
                item={item}
                removeItem={removeItem}
                selectedTopic={selectedTopic}
                setSelectedTopic={setSelectedTopic}
                permissions={permissions}
              />
            ))}
          {showNewItemInput ? (
            <div className="flex items-center mt-2">
              <input
                type="text"
                className="border rounded p-2 w-full"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                onKeyPress={handleItemKeyPress}
                placeholder="Enter item name"
              />
              <Select
                className="ml-2"
                options={options}
                value={options.find((option) => option.value === newItemType)}
                onChange={(option) => setNewItemType(option?.value || "video")}
                components={{
                  SingleValue: customSingleValue,
                  Option: customOption,
                }}
                styles={customStyles}
                isSearchable={false}
                menuPosition="fixed"
              />
              <button
                className="ml-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-800"
                onClick={handleAddNewItem}
              >
                <FaPlus />
              </button>
            </div>
          ) : (
            userRole === "teacher" &&
            permissions.canCreateItems && (
              <button
                className="mt-2 ml-8 px-4 py-2 bg-blue-200 text-black text-sm font-semibold rounded hover:bg-blue-400"
                onClick={() => setShowNewItemInput(true)}
              >
                Add Item +
              </button>
            )
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

export default ChapterComponent;
