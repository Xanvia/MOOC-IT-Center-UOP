import React, { useState } from "react";
import CodeEditor from "./CodeEditor";
import EditForm from "./EditorForm";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import EditButtonPrimary from "@/components/Buttons/EditButtonPrimary";
import { Item, Permissions } from "../types";

interface Props {
  permissions: Permissions;
}

const CodingQ: React.FC<Props> = ({ permissions }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { canEdit } = permissions;

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    setIsEditMode(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center ml-16 my-5">
        <h2 className="text-2xl text-primary font-semibold">
          Coding Question 1
        </h2>
        <div>
          {isEditMode?(
            <SecondaryButton text="SAVE" onClick={handleSaveClick} />
          ) : (
            canEdit && (
              <EditButtonPrimary text="Edit" onClick={handleEditClick} />
            )
          )}
        </div>
      </div>

      {isEditMode ? <EditForm /> : <CodeEditor />}
    </div>
  );
};

export default CodingQ;
