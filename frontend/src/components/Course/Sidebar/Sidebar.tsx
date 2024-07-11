"use client";
import React, { useState, useCallback, useEffect } from "react";
import { useSelectedTopic } from "@/contexts/SidebarContext";
import { Week, Item } from "@/components/Course/types";
import WeekComponent from "./WeekComponent";
import { fetchCourseContent } from "@/services/course.service";
import { useParams } from "next/navigation";
import Loader from "@/components/Loarder/Loarder";

const Sidebar: React.FC = () => {
  const { selectedTopic, setSelectedTopic } = useSelectedTopic();
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const params = useParams();

  const courseId = params.id;

  useEffect(() => {
    const loadCourseContent = async () => {
      if (!courseId) return;
      try {
        const data = await fetchCourseContent(courseId as string);
        setWeeks(data.weeks);
      } catch (error) {
        console.error(error);
      }
    };
    loadCourseContent();
    setIsLoading(false);
  }, [courseId]);

  const toggleWeek = useCallback(
    (weekIndex: number) => {
      setExpandedWeek(expandedWeek === weekIndex ? null : weekIndex);
    },
    [expandedWeek]
  );

  const addNewWeek = useCallback(() => {
    setWeeks((prevWeeks) => [
      ...prevWeeks,
      { name: `Week ${prevWeeks.length + 1}`, chapters: [] },
    ]);
  }, []);

  const addTopic = useCallback((weekIndex: number, topicName: string) => {
    setWeeks((prevWeeks) => {
      const newWeeks = [...prevWeeks];
      newWeeks[weekIndex] = {
        ...newWeeks[weekIndex],
        chapters: [
          ...newWeeks[weekIndex].chapters,
          { name: topicName, items: [] },
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

  const removeItem = useCallback(
    (weekIndex: number, chapterIndex: number, itemIndex: number) => {
      setWeeks((prevWeeks) => {
        const newWeeks = [...prevWeeks];
        newWeeks[weekIndex] = {
          ...newWeeks[weekIndex],
          chapters: newWeeks[weekIndex].chapters.map((chapter, cIdx) => {
            if (cIdx !== chapterIndex) return chapter;
            return {
              ...chapter,
              items: chapter.items
                ? chapter.items.filter((_, iIdx) => iIdx !== itemIndex)
                : [],
            };
          }),
        };
        return newWeeks;
      });
    },
    []
  );

  const removeTopic = useCallback((weekIndex: number, chapterIndex: number) => {
    setWeeks((prevWeeks) => {
      const newWeeks = [...prevWeeks];
      newWeeks[weekIndex] = {
        ...newWeeks[weekIndex],
        chapters: newWeeks[weekIndex].chapters.filter(
          (_, cIdx) => cIdx !== chapterIndex
        ),
      };
      return newWeeks;
    });
  }, []);

  const removeWeek = useCallback((weekIndex: number) => {
    setWeeks((prevWeeks) => prevWeeks.filter((_, wIdx) => wIdx !== weekIndex));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="fixed left-0 w-3/12 bg-gray-white h-full overflow-y-auto mb-96">
      <div className="w-84 p-8 border-r bg-white border-gray-200 h-full pb-20 mb-96">
        <div className="mt-4 mb-10">
          <h3 className="text-lg font-semibold">Progress</h3>
          <div className="relative h-2 mt-2 bg-gray-300 rounded">
            <div
              className="absolute top-0 left-0 h-full bg-blue-600 rounded w-3/12"
              style={{ width: "25%" }}
            ></div>
          </div>
          <p className="my-2 text-sm text-gray-600">
            4 of the 20 videos have been completed
          </p>
        </div>
        {weeks && weeks.map((week, weekIndex) => (
          <WeekComponent
            key={weekIndex}
            weekIndex={weekIndex}
            week={week}
            expanded={expandedWeek === weekIndex}
            toggleWeek={toggleWeek}
            addTopic={addTopic}
            addItem={addItem}
            removeItem={removeItem}
            removeTopic={removeTopic}
            removeWeek={removeWeek}
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
