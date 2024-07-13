"use client";
import React from "react";
import NoteEditor from "./NoteEditor";
import classes from "./Note.module.css";
import { useState } from "react";
import EditButtonPrimary from "@/components/Buttons/EditButtonPrimary";
import { editNote } from "@/services/course.service";
import { toast } from "sonner";

interface NoteProps {
  noteId: number;
  content: string;
}

const Note: React.FC<NoteProps> = ({noteId,content}) => {
  const isEdit = true;

  const [editView, setEditView] = useState(false);

  const handleSave = async (value: string) => {
    try {
      const response = await editNote(noteId, value);
      toast.success(response.message);
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
              <NoteEditor initialData={content} onClick={handleSave} />
            </div>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-2xl text-primary font-semibold ml-16 my-10">
            Introduction to Web Developing
          </h2>

          <div className="py-14 px-3 w-10/12 min-h-[600px] mx-auto text-left bg-primary_light">
            <div className="my-6 ml-12">
              {isEdit && (
                <EditButtonPrimary
                  text="E D I T"
                  onClick={() => setEditView(true)}
                />
              )}
            </div>
            <div
              className={`${classes.note} ql-editor`}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Note;
