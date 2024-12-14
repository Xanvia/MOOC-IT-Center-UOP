"use client";
import React, { useEffect, useState } from "react";
import TeacherChat from "@/components/Chat/TeacherChat";
import { useGlobal } from "@/contexts/store";
import CourseCreatorChat from "@/components/Chat/CourseCreatorChat";

const ChatPage: React.FC = () => {
  const isCreator = useGlobal().isCreator;

  return (
    <div className="flex h-screen bg-gray-50">
      <main className="flex-1 flex flex-col overflow-hidden p-6 bg-white rounded-lg shadow-md mx-6 my-6">
        {isCreator ? <CourseCreatorChat /> : <TeacherChat />}
      </main>
    </div>
  );
};

export default ChatPage;
