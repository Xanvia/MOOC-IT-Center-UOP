"use client";
import React, { useState, useCallback } from "react";
import { useSelectedTopic } from "@/contexts/SidebarContext";
import { initialWeeks } from "@/data/coursedata";
import { Week, Item } from "@/components/Course/types";
import WeekComponent from "./WeekComponent";

const Sidebar: React.FC = () => {
  const { selectedTopic, setSelectedTopic } = useSelectedTopic();
  const [weeks, setWeeks] = useState<Week[]>(initialWeeks);
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);

  const toggleWeek = useCallback(
    (weekIndex: number) => {
      setExpandedWeek(expandedWeek === weekIndex ? null : weekIndex);
    },
    [expandedWeek]
  );

  const addNewWeek = useCallback(() => {
    setWeeks((prevWeeks) => [
      ...prevWeeks,
      { weekname: `Week ${prevWeeks.length + 1}`, chapters: [] },
    ]);
  }, []);

  const addTopic = useCallback((weekIndex: number, topicName: string) => {
    setWeeks((prevWeeks) => {
      const newWeeks = [...prevWeeks];
      newWeeks[weekIndex] = {
        ...newWeeks[weekIndex],
        chapters: [
          ...newWeeks[weekIndex].chapters,
          { title: topicName, items: [] },
        ],
      };
      return newWeeks;
    });
  }, []);

  const addItem = useCallback(
    (weekIndex: number, chapterIndex: number, item: Item) => {
      setWeeks((prevWeeks) => {
        const newWeeks = prevWeeks.map((week, wIdx) => {
          if (wIdx !== weekIndex) return week;
          return {
            ...week,
            chapters: week.chapters.map((chapter, cIdx) => {
              if (cIdx !== chapterIndex) return chapter;
              return {
                ...chapter,
                items: [...(chapter.items || []), item],
              };
            }),
          };
        });
        return newWeeks;
      });
    },
    []
  );

  return (
    <div className="fixed left-0 w-64 bg-gray-white h-full overflow-y-auto">
      <div className="w-84 p-8 border-r bg-white border-gray-200 h-full overflow-y-auto pb-20">
        <div className="mt-4 mb-10">
          <h3 className="text-lg font-semibold">Progress</h3>
          <div className="relative h-2 mt-2 bg-gray-300 rounded">
            <div className="absolute top-0 left-0 h-full bg-blue-600 rounded w-3/12"></div>
          </div>
          <p className="my-2 text-sm text-gray-600">
            4 of the 20 videos have been completed
          </p>
        </div>
        {weeks.map((week, weekIndex) => (
          <WeekComponent
            key={weekIndex}
            weekIndex={weekIndex}
            week={week}
            expanded={expandedWeek === weekIndex}
            toggleWeek={toggleWeek}
            addTopic={addTopic}
            addItem={addItem}
            selectedTopic={selectedTopic}
            setSelectedTopic={setSelectedTopic}
          />
        ))}
        <button
          className="w-full px-4 py-2 bg-blue-200 text-black text-sm font-semibold rounded hover:bg-blue-400"
          onClick={addNewWeek}
        >
          Add Week +
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
