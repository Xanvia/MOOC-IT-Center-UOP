"use client";
import React, { useEffect, useState } from "react";
import Note from "@/components/Course/Note/Note";
import CourseVideo from "@/components/Course/CourseVideo/CourseVideo";
import { useSelectedTopic } from "@/contexts/SidebarContext";
import { Item } from "@/components/Course/types";

const Page: React.FC = () => {
  const { selectedTopic } = useSelectedTopic();
  const [item, setItem] = useState<Item>({ ...selectedTopic });

  useEffect(() => {
    setItem({ ...selectedTopic });
    console.log(selectedTopic.content);
  }, [selectedTopic]);

  return (
    <>
      {item.type === "Note" ? (
        <div className="flex-grow p-4 mb-96 ml-96" key={item.id}>
          <Note selectedTopic={item} />
        </div>
      ) : item.type === "Video" ? (
        <div className="flex-grow p-4 mb-96 ml-96" key={item.id}>
          <CourseVideo videoURL={item.content.video_link} title={item.name} />
        </div>
      ) : (
        <div>No content available</div>
      )}
    </>
  );
};

export default Page;
