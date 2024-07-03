"use client";
import React from "react";
import NoteEditor from "./NoteEditor";

const Note: React.FC = () => {
  return (
    <div>
      <h2>Note Component</h2>
      <div className="py-14 px-3 w-2/3 min-h-[600px] mx-auto text-left bg-primary_light mt-20">
        <div className="space-y-2">
          <div className="pt-4">
            <NoteEditor onClick={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
