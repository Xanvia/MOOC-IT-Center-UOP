import React, { useState, useCallback } from "react";
import { Chapter, Item } from "@/components/Course/types";
import { FaChevronRight, FaChevronDown, FaPlus, FaTrash } from "react-icons/fa";
import Select, {
  SingleValueProps,
  StylesConfig,
  OptionProps,
} from "react-select";
import SideBarIcon from "@/icons/sideBarIcon";
import ItemComponent from "./ItemComponent";
import ConfirmDeleteModal from "../Modals/ConfrimDeleteModal";

interface ChapterComponentProps {
  weekIndex: number;
  chapterIndex: number;
  chapter: Chapter;
  expanded: boolean;
  toggleSubtopic: (weekIndex: number, chapterIndex: number) => void;
  addItem: (weekIndex: number, chapterIndex: number, item: Item) => void;
  removeItem: (
    weekIndex: number,
    chapterIndex: number,
    itemIndex: number
  ) => void;
  removeTopic: (weekIndex: number, chapterIndex: number) => void;
  selectedTopic: Item | null;
  setSelectedTopic: (item: Item) => void;
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
}) => {
  const [newItemName, setNewItemName] = useState<string>("");
  const [showNewItemInput, setShowNewItemInput] = useState<boolean>(false);
  const [newItemType, setNewItemType] = useState<string>("video");
  const [showModal, setShowModal] = useState<boolean>(false);

  const options: OptionType[] = [
    { value: "video", label: "Video", type: "video" },
    { value: "note", label: "Note", type: "note" },
    { value: "quiz", label: "Quiz", type: "quiz" },
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
    if (newItemName.trim() !== '') {
      addItem(weekIndex, chapterIndex, { name: newItemName, type: newItemType as 'video' | 'note' | 'quiz', content: '' });
      setNewItemName('');
      setNewItemType('video');
      setShowNewItemInput(false);
    }
  }, [newItemName, newItemType, weekIndex, chapterIndex, addItem]);

  const handleItemKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddNewItem();
    }
  };

  const handleDelete = () => {
    removeTopic(weekIndex, chapterIndex);
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
        <h5 className="font-medium ml-4 my-4 cursor-pointer flex items-center max-w-48 leading-tight" onClick={() => toggleSubtopic(weekIndex, chapterIndex)}>
          {expanded ? <FaChevronDown className="mr-2" /> : <FaChevronRight className="mr-2" />}
          {chapter.name}
        </h5>
        <button
          className="ml-2 bg-slate-400 text-white p-1 rounded hover:bg-slate-600"
          onClick={() => setShowModal(true)}
        >
          <FaTrash />
        </button>
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
            <button
              className="mt-2 ml-8 px-4 py-2 bg-blue-200 text-black text-sm font-semibold rounded hover:bg-blue-400"
              onClick={() => setShowNewItemInput(true)}
            >
              Add Item +
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

export default ChapterComponent;
