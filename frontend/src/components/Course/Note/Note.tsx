"use client";
import React from "react";
import NoteEditor from "./NoteEditor";
import classes from "./Note.module.css";
import { useState } from "react";
import EditButtonPrimary from "@/components/Buttons/EditButtonPrimary";
import { editNote } from "@/services/course.service";
import { toast } from "sonner";
import { Item } from "@/components/Course/types";
import { useGlobal } from "@/contexts/store";

interface NoteProps {
  selectedTopic: Item;
}

const Note: React.FC<NoteProps> = ({ selectedTopic }) => {
  const isEdit = true;
  const { userRole } = useGlobal();

  const [noteContent, setNoteContent] = useState(selectedTopic.content);
  const [editView, setEditView] = useState(false);

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
            Introduction to Web Developing
          </h2>

          <div className="py-14 px-3 w-10/12 min-h-[600px] mx-auto text-left bg-white">
            <div className="my-6 ml-12">
              {isEdit && userRole !== "student" && (
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
        </>
      )}
    </div>
  );
};

export default Note;
