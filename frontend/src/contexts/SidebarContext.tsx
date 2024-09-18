"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Item, Week } from "@/components/Course/types";
interface SelectedTopicContextType {
  selectedTopic: Item;
  setSelectedTopic: React.Dispatch<React.SetStateAction<Item>>;
  weeks: Week[];
  setWeeks: React.Dispatch<React.SetStateAction<Week[]>>;
  expandedWeek: number | null;
  setExpandedWeek: React.Dispatch<React.SetStateAction<number | null>>;
  expandedSubtopics: { [key: number]: boolean };
  setExpandedSubtopics: React.Dispatch<
    React.SetStateAction<{ [key: number]: boolean }>
  >;
  updateItemStatus: (itemId: number, updates: Partial<Item>) => void;
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
  const [selectedTopic, setSelectedTopic] = useState<Item>({
    id: 0,
    name: "",
    content: "",
    type: "Note",
    has_started: false,
    completed: false,
  });

  const [weeks, setWeeks] = useState<Week[]>([]);
  const [expandedWeek, setExpandedWeek] = useState<number | null>(0);
  const [expandedSubtopics, setExpandedSubtopics] = useState<{
    [key: number]: boolean;
  }>({ 0: true });

  const updateItemStatus = (itemId: number, updates: Partial<Item>) => {
    setWeeks(prevWeeks => 
      prevWeeks.map(week => ({
        ...week,
        chapters: week.chapters?.map(chapter => ({
          ...chapter,
          items: chapter.items?.map(item => 
            item.id === itemId ? { ...item, ...updates } : item
          )
        }))
      }))
    );
  };

  return (
    <SelectedTopicContext.Provider
      value={{
        selectedTopic,
        setSelectedTopic,
        weeks,
        setWeeks,
        expandedWeek,
        setExpandedWeek,
        expandedSubtopics,
        setExpandedSubtopics,
        updateItemStatus,
      }}
    >
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
