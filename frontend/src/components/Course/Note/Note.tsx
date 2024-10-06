"use client";
import React from "react";
import NoteEditor from "./NoteEditor";
import classes from "./Note.module.css";
import { useState } from "react";
import EditButtonPrimary from "@/components/Buttons/EditButtonPrimary";
import { editNote } from "@/services/course.service";
import { toast } from "sonner";
import { Item, Permissions } from "@/components/Course/types";
import { useGlobal } from "@/contexts/store";
import ChatDrawer from "../Drawer/Drawer";

interface NoteProps {
  selectedTopic: Item;
  permissions: Permissions;
}

const Note: React.FC<NoteProps> = ({ selectedTopic, permissions }) => {
  const { userRole } = useGlobal();

  const [noteContent, setNoteContent] = useState(selectedTopic.content);
  const [editView, setEditView] = useState(false);
  const [isEdit, setIsEdit] = useState(permissions.canEdit);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSave = async (value: string) => {
    try {
      const response = await editNote(selectedTopic.id!, value);
      toast.success(response.message);
      setNoteContent(value);
      setEditView(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div>
      {editView ? (
        <div className="py-14 px-3 w-10/12 min-h-[600px] mx-auto text-left bg-primary_light">
          <div className="space-y-2">
            <div className="pt-2">
              <NoteEditor
                id={selectedTopic.id}
                initialData={noteContent}
                onClick={handleSave}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-2xl text-primary font-semibold ml-16 my-10">
            {selectedTopic.name}
          </h2>

          <div className="py-14 px-3 w-10/12 min-h-[600px] mx-auto text-left bg-white">
            <div className="my-6 ml-12">
              {isEdit && userRole === "teacher" && (
                <EditButtonPrimary
                  text="E D I T"
                  onClick={() => setEditView(true)}
                />
              )}
            </div>
            <div
              className={`${classes.note} ql-editor`}
              dangerouslySetInnerHTML={{ __html: noteContent }}
            />


          </div>

          <button
            className="fixed top-1/2 right-0 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-l-lg shadow-lg focus:outline-none"
            onClick={toggleDrawer}
          >
            {isDrawerOpen ? ">" : "<"} {/* Toggle Arrow Icon */}
          </button>

          {/* Chat Drawer Component */}
          <ChatDrawer
            isOpen={isDrawerOpen}
            toggleDrawer={toggleDrawer}
          />
        </>
      )}
    </div>
  );
};

export default Note;
