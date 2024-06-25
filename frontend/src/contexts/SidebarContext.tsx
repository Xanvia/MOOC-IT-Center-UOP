"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { initialTopics } from "@/components/Sidebar/Sidebar";

interface Item {
  title: string;
  content: JSX.Element | string;
  type: "video" | "note" | "quiz";
}

interface SelectedTopicContextType {
  selectedTopic: Item;
  setSelectedTopic: React.Dispatch<React.SetStateAction<Item>>;
}

const SelectedTopicContext = createContext<SelectedTopicContextType | null>(
  null
);

interface SelectedTopicProviderProps {
  children: ReactNode;
}

export const SelectedTopicProvider: React.FC<SelectedTopicProviderProps> = ({
  children,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<Item>(
    initialTopics[0].subtopics[0].items[0]
  );

  return (
    <SelectedTopicContext.Provider value={{ selectedTopic, setSelectedTopic }}>
      {children}
    </SelectedTopicContext.Provider>
  );
};

export const useSelectedTopic = () => {
  const context = useContext(SelectedTopicContext);
  if (context === null) {
    throw new Error(
      "useSelectedTopic must be used within a SelectedTopicProvider"
    );
  }
  return context;
};
