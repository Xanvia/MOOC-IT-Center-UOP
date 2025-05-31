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
import FileUpload from "./FileUpload"; // Assuming FileUpload is in the same directory
import { HOST } from "@/utils/constants";

interface NoteProps {
  selectedTopic: Item;
  permissions: Permissions;
  reloadData: () => void;
}

const Note: React.FC<NoteProps> = ({
  selectedTopic,
  permissions,
  reloadData,
}) => {
  const { userRole } = useGlobal();

  const [noteContent, setNoteContent] = useState(selectedTopic.content);
  const [editView, setEditView] = useState(false);
  const [isEdit, setIsEdit] = useState(permissions.canEdit); // Assuming this correctly reflects edit permission for the note itself
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const canEditContent = isEdit && userRole === "teacher"; // Combined condition for clarity

  const handleSave = async (value: string) => {
    try {
      const response = await editNote(selectedTopic.id!, value);
      toast.success(response.message);
      reloadData();
      setNoteContent(value); // Update local state
      setEditView(false);
      // setNoteContent(value); // This line is redundant
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div>
      {editView && canEditContent ? ( // Ensure editView is only possible if user can edit
        <div className="py-14 px-3 w-10/12 min-h-[600px] mx-auto text-left bg-primary_light">
          <div className="space-y-6"> {/* Increased spacing */}
            {/* FileUpload before NoteEditor in edit mode */}
            {canEditContent && (
              <div className="p-4 border border-gray-300 rounded-lg bg-white">
                <h3 className="text-lg font-semibold mb-3 text-primary">Manage Associated File</h3>
                <FileUpload
                  noteId={selectedTopic.id!}
                  initialFileUrl={selectedTopic.file_url}
                  reloadData={reloadData} // Pass reloadData
                />
              </div>
            )}
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

          <div className="py-14 px-3 w-10/12 min-h-[600px] mx-auto text-left bg-white shadow-md rounded-lg">
            <div className="my-6 ml-12 flex flex-col space-y-4"> {/* Use flex-col for stacking */}
              {canEditContent && (
                <EditButtonPrimary
                  text="E D I T   N O T E"
                  onClick={() => setEditView(true)}
                />
              )}
              {/* FileUpload in non-edit mode, visible if user can edit */}
              {canEditContent && (
                 <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="text-md font-semibold mb-2 text-gray-700">Associated File</h3>
                    <FileUpload
                        noteId={selectedTopic.id!}
                        initialFileUrl={selectedTopic.file_url}
                        reloadData={reloadData} // Pass reloadData
                    />
                 </div>
              )}
              {/* Display existing file if user cannot edit but a file exists */}
              {!canEditContent && selectedTopic.file_url && (
                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <h3 className="text-md font-semibold mb-2 text-gray-700">Associated File</h3>
                    <p className="text-sm">
                        <a
                        href={HOST + selectedTopic.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                        >
                        View File: {selectedTopic.file_url.split('/').pop()}
                        
                        </a>
                    </p>
                </div>
              )}
            </div>

            <div
              className={`${classes.note} ql-editor px-12 pb-12`} // Added padding for content
              dangerouslySetInnerHTML={{ __html: noteContent }}
            />
          </div>

          <button
            className="fixed top-1/2 right-0 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-l-lg shadow-lg focus:outline-none hover:bg-blue-600 transition-colors"
            onClick={toggleDrawer}
            aria-label={isDrawerOpen ? "Close chat drawer" : "Open chat drawer"}
          >
            {isDrawerOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            )}
          </button>

          {/* Chat Drawer Component */}
          <ChatDrawer
            isOpen={isDrawerOpen}
            toggleDrawer={toggleDrawer}
            id={selectedTopic.id}
          />
        </>
      )}
    </div>
  );
};

export default Note;