import React, { useState } from "react";
import CodeEditor from "./CodeEditor";
import EditForm from "./EditorForm";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import EditButtonPrimary from "@/components/Buttons/EditButtonPrimary";
import { Item, Permissions } from "../types";

interface Props {
  permissions: Permissions;
  item: Item;
}

const CodingQ: React.FC<Props> = ({ permissions, item }) => {
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
        <h2 className="text-2xl text-primary font-semibold">{item.name}</h2>
        <div>
          {isEditMode ? (
            <SecondaryButton text="SAVE" onClick={handleSaveClick} />
          ) : (
            canEdit && (
              <EditButtonPrimary text="Edit" onClick={handleEditClick} />
            )
          )}
        </div>
      </div>

      {isEditMode ? <EditForm item={item} /> : <CodeEditor />}
    </div>
  );
};

export default CodingQ;
