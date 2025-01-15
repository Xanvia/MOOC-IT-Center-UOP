"use client";
import React, { useState } from "react";
import CodeEditor from "./CodeEditor";
import EditForm from "./EditorForm";
import EditButtonPrimary from "@/components/Buttons/EditButtonPrimary";
import { Item, Permissions } from "../types";

interface Props {
  permissions: Permissions;
  item: Item;
  userRole: string;
  setIsFinished: (isFinished: boolean) => void;
}

const CodingQ: React.FC<Props> = ({
  permissions,
  item,
  userRole,
  setIsFinished,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { canEdit } = permissions;

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSave = () => {
    window.location.reload();
    setIsEditMode(false);
  };

  return (
    <div>
      <div className="ml-4 my-5 flex justify-between items-center">
        <h2 className="text-2xl text-primary font-semibold">{item.name}</h2>
        {item.content.graded ? (
          <span className="text-green-600 font-semibold">
            Grade: {item.content.grade} (Graded)
          </span>
        ) : item.content.grade ? (
          <span className="text-yellow-600 font-semibold">
            Grade: {item.content.grade} (To be approved)
          </span>
        ) : null}
      </div>
      <div className="mt-3">
        <div
          className="p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-sm"
          style={{ minHeight: "150px" }}
        >
          <h3 className="text-lg font-semibold text-primary">Question:</h3>
          <p className="mt-2 text-base text-gray-800">
            {item.content.question}
          </p>
          <p className="mt-4 text-sm text-gray-600">
            {item.content.explanation}
          </p>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        {!isEditMode && canEdit && (
          <EditButtonPrimary
            text="Edit Question Details"
            onClick={handleEditClick}
          />
        )}
      </div>

      {isEditMode ? (
        <EditForm item={item} onSave={handleSave} />
      ) : (
        <CodeEditor
          initialCode={item.content.starter_code}
          canEdit={canEdit}
          language={item.content.language}
          codeID={item.id}
          testCases={item.content.test_cases}
          userRole={userRole}
          setIsFinished={setIsFinished}
        />
      )}
    </div>
  );
};
export default CodingQ;
