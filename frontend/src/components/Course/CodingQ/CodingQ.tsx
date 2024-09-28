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
  const [editMode, setEditMode] = useState(false); // Manage view between EditForm and CodeEditor
  const [isEdit, setIsEdit] = useState<boolean>(permissions.canEdit);

  // Toggle between EditorForm and CodeEditor within edit mode
  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  return (
    <div>
      <div className="flex justify-between items-center ml-16 my-5">
        <h2 className="text-2xl text-primary font-semibold">
          Coding Question 1
        </h2>
        <div>
          {editMode ? (
            <SecondaryButton text="SAVE" onClick={toggleEditMode} />
          ) : (
            isEdit && <EditButtonPrimary text="EDIT" onClick={toggleEditMode} />
          )}
        </div>
      </div>

      {editMode ? <EditForm /> : <CodeEditor />}
    </div>
  );
};

export default CodingQ;
