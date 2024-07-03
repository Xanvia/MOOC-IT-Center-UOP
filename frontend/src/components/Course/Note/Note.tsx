"use client";
import React from "react";
import NoteEditor from "./NoteEditor";

const Note: React.FC = () => {
  return (
    <div>
      
      <h2 className = "text-2xl text-primary font-semibold ml-16 my-10">Introduction to Web Developing</h2>
      <div className="py-14 px-3 w-10/12 min-h-[600px] mx-auto text-left bg-primary_light">
        <div className="space-y-2">
          <div className="pt-2">
            <NoteEditor onClick={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
