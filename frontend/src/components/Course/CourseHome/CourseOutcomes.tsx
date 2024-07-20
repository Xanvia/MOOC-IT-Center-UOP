import React, { useCallback, useState } from "react";
import { FaChevronRight, FaChevronDown, FaPlus, FaTrash } from "react-icons/fa";
import EditButtonPrimary from "@/components/Buttons/EditButtonPrimary";
import SolidButton from "@/components/Buttons/SolidButton";
import { addOutcomes } from "@/services/course.service";
import { toast } from "sonner";

interface CourseOutcomesProps {
  outcomes: string[];
  isEdit: boolean;
  courseId: number;
}

const CourseOutcomes: React.FC<CourseOutcomesProps> = ({
  outcomes,
  isEdit,
  courseId,
}) => {
  const [outComes, setOutcomes] = useState<string[]>(outcomes);
  const [newOutcomeName, setNewOutcomeName] = useState<string>("");
  const [editView, setEditView] = useState(false);

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

  const toggleEditView = () => {
    setEditView(!editView);
  };

  const handleSave = async () => {
    toggleEditView();
    try {
      const response = await addOutcomes(1, outComes);
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDeleteOutcome = (index: number) => {
    const newOutcomes = outComes.filter((_, i) => i !== index);
    setOutcomes(newOutcomes);
  };

  return (
    <div className="w-full mb-10">
      <div className="flex justify-center lg:mx-32">
        <div className="py-14 px-10 sm:px-20 xl:mx-28 text-left bg-primary_light w-full">
          <h1 className="text-2xl text-primary font-semibold mt-4">
            Benefits of Learning This Course
          </h1>

          <div className="my-6 ml-12">
            {isEdit && (
              <EditButtonPrimary
                text="E D I T"
                onClick={() => setEditView(true)}
              />
            )}
          </div>

          {editView && (
            <>
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
            </>
          )}

          <ul className="mt-10 text-primary list-none list-inside space-y-2">
            {outComes.map((outcome, index) => (
              <li key={index}>
                + {outcome}
                {editView && (
                  <button
                    className="ml-2 bg-slate-400 text-white p-1 rounded hover:bg-slate-600"
                    onClick={()=>handleDeleteOutcome(index)}
                  >
                    <FaTrash />
                  </button>
                )}
              </li>
            ))}
          </ul>
          {editView && (
            <div className="flex justify-end mt-8">
              <SolidButton type="button" text="S A V E" onClick={handleSave} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseOutcomes;
