"use client";
import React from "react";
import Note from "@/components/Course/Note/Note";
import { useSelectedTopic } from "@/contexts/SidebarContext";

const Page: React.FC = () => {
  const { selectedTopic, setSelectedTopic } = useSelectedTopic();

  return (
    <>
      {selectedTopic.type === "Note" && (
        <div className="flex-grow p-4 mb-96 ml-96">
          <Note
            content={selectedTopic.content}
            noteId={selectedTopic.id || 0}
          />
        </div>
      )}
    </>
  );
};

export default Page;
