"use client";
import React from "react";
import Note from "@/components/Course/Note/Note";
import CourseVideo from "@/components/Course/CourseVideo/CourseVideo";
import { useSelectedTopic } from "@/contexts/SidebarContext";

const Page: React.FC = () => {
  const { selectedTopic, setSelectedTopic } = useSelectedTopic();

  const renderContent = () => {
    switch (selectedTopic.type) {
      case "Note":
        return (
          <div className="flex-grow p-4 mb-96 ml-96">
            <Note selectedTopic={selectedTopic} />
          </div>
        );
      case "Video":
        return (
          <div className="flex-grow p-4 mb-96 ml-96">
            <CourseVideo videoURL={selectedTopic.content.video_link} title={selectedTopic.name} />
          </div>
        );
      default:
        return <div>No content available</div>;
    }
  };

  return <>{renderContent()}</>;
};

export default Page;
