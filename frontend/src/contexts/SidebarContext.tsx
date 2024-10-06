"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Item, Permissions, Week } from "@/components/Course/types";

// Add new types for notifications and discussions
interface Announcement {
  id: number;
  title: string;
  content: string;
  timestamp: string;
  author: string;
}

interface Discussion {
  id: number;
  user: string;
  message: string;
  timestamp: string;
}

// Update the context type
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
  permissions: Permissions;
  setPermissions: React.Dispatch<React.SetStateAction<Permissions>>;
  // Add new properties for notifications and discussions
  announcements: Announcement[];
  setAnnouncements: React.Dispatch<React.SetStateAction<Announcement[]>>;
  discussions: Discussion[];
  setDiscussions: React.Dispatch<React.SetStateAction<Discussion[]>>;
  addAnnouncement: (announcement: Omit<Announcement, 'id'>) => void;
  addDiscussion: (discussion: Omit<Discussion, 'id'>) => void;
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
  const [permissions, setPermissions] = useState<Permissions>({
    canEdit: false,
    canDelete: false,
    canCreateItems: false,
    canUploadFiles: false,
  });
  const [expandedSubtopics, setExpandedSubtopics] = useState<{
    [key: number]: boolean;
  }>({ 0: true });

  // Add new state for notifications and discussions
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);

  const updateItemStatus = (itemId: number, updates: Partial<Item>) => {
    setWeeks((prevWeeks) =>
      prevWeeks.map((week) => ({
        ...week,
        chapters: week.chapters?.map((chapter) => ({
          ...chapter,
          items: chapter.items?.map((item) =>
            item.id === itemId ? { ...item, ...updates } : item
          ),
        })),
      }))
    );
  };

  // Add new functions for handling announcements and discussions
  const addAnnouncement = (announcement: Omit<Announcement, 'id'>) => {
    setAnnouncements((prev) => [
      ...prev,
      {
        ...announcement,
        id: prev.length + 1,
      },
    ]);
  };

  const addDiscussion = (discussion: Omit<Discussion, 'id'>) => {
    setDiscussions((prev) => [
      ...prev,
      {
        ...discussion,
        id: prev.length + 1,
      },
    ]);
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
        permissions,
        setPermissions,
        // Add new values to the context
        announcements,
        setAnnouncements,
        discussions,
        setDiscussions,
        addAnnouncement,
        addDiscussion,
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