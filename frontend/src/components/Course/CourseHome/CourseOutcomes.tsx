import React, { useCallback, useState } from "react";
import { FaChevronRight, FaChevronDown, FaPlus, FaTrash } from "react-icons/fa";

interface CourseOutcomesProps {
  outcomes: string[];
}

const CourseOutcomes: React.FC<CourseOutcomesProps> = ({ outcomes }) => {
  const [outComes, setOutcomes] = useState<string[]>(outcomes);
  const [newOutcomeName, setNewOutcomeName] = useState<string>("");

  const handleAddNewOutcome = useCallback(() => {
    if (newOutcomeName.trim() !== "") {
      setOutcomes([...outComes, newOutcomeName]);
      setNewOutcomeName("");
    }
  }, [newOutcomeName]);

  const handleOutcomeKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddNewOutcome();
    }
  };

  return (
    <div className="w-full mb-10">
      <div className="flex justify-center lg:mx-32">
        <div className="py-14 px-10 sm:px-20 xl:mx-28 text-left bg-primary_light w-full">
          <h1 className="text-2xl text-primary font-semibold mt-4">
            Benefits of Learning This Course
          </h1>

          <div className="flex ml-4 mt-4">
            <input
              type="text"
              className="border rounded p-2 w-full"
              value={newOutcomeName}
              onChange={(e) => setNewOutcomeName(e.target.value)}
              onKeyPress={handleOutcomeKeyPress}
              placeholder="Enter outcome name"
            />
            <button
              className="ml-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-800"
              onClick={handleAddNewOutcome}
            >
              <FaPlus />
            </button>
          </div>

          <ul className="mt-10 text-primary list-none list-inside space-y-2">
            {outComes.map((outcome, index) => (
              <li key={index}>+ {outcome}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseOutcomes;
