"use client";
import React, { useState, useCallback, useEffect } from "react";
import { useSelectedTopic } from "@/contexts/SidebarContext";
import { Week, Item } from "@/components/Course/types";
import WeekComponent from "./WeekComponent";
import {
  createChapter,
  createNote,
  createWeek,
  deleteComponent,
  fetchCourseContent,
} from "@/services/course.service";
import { useParams } from "next/navigation";
import Loader from "@/components/Loarder/Loarder";
import { toast } from "sonner";

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

  const addNewWeek = useCallback(async () => {
    const weekName = `Week ${weeks.length + 1}`;
    try {
      const response = await createWeek(courseId as string, weekName); // Added await here
      toast.success(response.message);
      setWeeks((prevWeeks) => [
        ...prevWeeks,
        { id: response.data.id, name: weekName, chapters: [] },
      ]);
    } catch (error: any) {
      toast.error(error.message);
    }
  }, [weeks, courseId]);

  const addTopic = useCallback(
    async (weekIndex: number, topicName: string, weekId: string) => {
      try {
        const response = await createChapter(weekId as string, topicName);
        console.log(response);
        toast.success(response.message);
        setWeeks((prevWeeks) => {
          const newWeeks = [...prevWeeks];
          newWeeks[weekIndex] = {
            ...newWeeks[weekIndex],
            chapters: [
              ...newWeeks[weekIndex].chapters,
              { id: response.data.id, name: topicName, items: [] },
            ],
          };
          return newWeeks;
        });
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    []
  );

  const addItem = useCallback(
    async (
      weekIndex: number,
      chapterIndex: number,
      chapterId: string,
      item: Item
    ) => {
      let response;
      try {
        switch (item.type) {
          case "Note":
            response = await createNote(chapterId as string, item.name);
            break;
          case "Video":
            break;
          case "Quiz":
            break;
          default:
            break;
        }
        toast.success(response.message);
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
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    [weeks]
  );

  const removeItem = useCallback(
    async (
      weekIndex: number,
      chapterIndex: number,
      itemIndex: number,
      itemId: string
    ) => {
      try {
        const response = await deleteComponent("Note", itemId);
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
        toast.success("Note deleted successfully");
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    []
  );

  const removeTopic = useCallback(
    async (weekIndex: number, chapterIndex: number, chapterId: string) => {
      try {
        const response = await deleteComponent("Chapter", chapterId);
        toast.success("Chapter deleted successfully");
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
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    []
  );

  const removeWeek = useCallback(async (weekIndex: number, weekId: string) => {
    try {
      const response = await deleteComponent("Week", weekId);
      toast.success("Week deleted successfully");
      setWeeks((prevWeeks) =>
        prevWeeks.filter((_, wIdx) => wIdx !== weekIndex)
      );
    } catch (error: any) {
      toast.error(error.message);
    }
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
        {weeks &&
          weeks.map((week, weekIndex) => (
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
