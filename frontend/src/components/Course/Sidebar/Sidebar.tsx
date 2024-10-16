"use client";
import React, { useState, useCallback, useEffect } from "react";
import { useSelectedTopic } from "@/contexts/SidebarContext";
import { Week, Item } from "@/components/Course/types";
import WeekComponent from "./WeekComponent";
import {
  createChapter,
  createNote,
  createVideo,
  createQuiz,
  createWeek,
  deleteComponent,
  fetchCourseContent,
  getProgress,
  createCodingQ,
  startComponent,
} from "@/services/course.service";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/components/Loarder/Loarder";
import { toast } from "sonner";
import { useGlobal } from "@/contexts/store";

const Sidebar: React.FC = () => {
  const {
    selectedTopic,
    setSelectedTopic,
    weeks,
    setWeeks,
    expandedWeek,
    setExpandedWeek,
    setPermissions,
    permissions,
  } = useSelectedTopic();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const params = useParams();
  const router = useRouter();
  const courseId = params.id;
  const { userRole, isLoggedIn } = useGlobal();
  const [progress, setProgress] = useState<number>(0);
  const [progressLoaded, setProgressLoaded] = useState<boolean>(false);
  const [reload, setReload] = useState(false);

  const reloadData = () => {
    setReload((prevState) => !prevState);
  };

  useEffect(() => {
    const loadCourseContent = async () => {
      if (!courseId) return;
      try {
        const data = await fetchCourseContent(courseId as string);
        setWeeks(data.weeks);
        setPermissions(data.permissions);
        setIsLoading(false);
      } catch (error: any) {
        if (
          error == "Error: You do not have permission to perform this action."
        ) {
          setIsLoading(false);
          router.push(`/courses/${courseId}`);
        }
      }
    };

    loadCourseContent();
  }, [courseId, router, reload]);

  // Fetch progress after weeks is loaded
  useEffect(() => {
    if (userRole === "teacher") {
      const lastWeek = weeks[weeks.length - 1];
      if (lastWeek && lastWeek.chapters && lastWeek.chapters.length > 0) {
        const lastChapter = lastWeek.chapters[lastWeek.chapters.length - 1];
        if (lastChapter.items && lastChapter.items.length > 0) {
          const lastItem = lastChapter.items[lastChapter.items.length - 1];
          setSelectedTopic(lastItem);
          setExpandedWeek(weeks.length - 1);
          return;
        }
      }
      setExpandedWeek(weeks.length - 1);
      return;
    }
    const loadProgress = async () => {
      if (!courseId || weeks.length === 0) return;
      try {
        const progress = await getProgress(courseId as string);
        setProgress(progress.progress);
        if (progress.progress === 0 && weeks[0].chapters[0].items) {
          const firstItem = weeks[0].chapters[0].items[0];
          if (!firstItem.has_started) {
            startComponent(String(firstItem.id));
          }
        }
        if (progress?.current_component) {
          const {
            week: weekId,
            chapter: chapterId,
            id: itemId,
          } = progress.current_component;
          // Find the week with the matching ID
          const week = weeks.find((week) => week.id === weekId);
          if (week) {
            const chapter = week.chapters.find(
              (chapter) => chapter.id === chapterId
            );
            if (chapter) {
              const foundItem = chapter.items?.find(
                (item) => item.id === itemId
              );
              if (foundItem) {
                setSelectedTopic(foundItem);
                setExpandedWeek(weeks.indexOf(week));
              }
            }
          }
        }
        setProgressLoaded(true);
      } catch (error: any) {
        if (userRole === "student") {
          toast.error(error.message);
        }
      }
    };

    if (weeks.length > 0 && !progressLoaded) {
      loadProgress();
    }
  }, [courseId, weeks, progressLoaded]);

  const toggleWeek = useCallback(
    (weekIndex: number) => {
      setExpandedWeek(expandedWeek === weekIndex ? null : weekIndex);
    },
    [expandedWeek]
  );

  const handleNotificationClick = () => {
    setSelectedTopic({
      id: -1,
      name: "Notifications",
      content: "",
      type: "Notifications",
      has_started: true,
      completed: true,
    });
  };

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
            response = await createVideo(chapterId as string, item.name);
            break;
          case "Quiz":
            response = await createQuiz(chapterId as string, item.name);
          case "Code":
            response = await createCodingQ(chapterId as string, item.name);
            break;
          default:
            break;
        }
        toast.success(response.message);
        item.id = response.data.id;
        // setWeeks((prevWeeks) => {
        //   const newWeeks = prevWeeks.map((week, wIdx) => {
        //     if (wIdx !== weekIndex) return week;
        //     return {
        //       ...week,
        //       chapters: week.chapters.map((chapter, cIdx) => {
        //         if (cIdx !== chapterIndex) return chapter;
        //         return {
        //           ...chapter,
        //           items: [...(chapter.items || []), item],
        //         };
        //       }),
        //     };
        //   });
        //   return newWeeks;
        // });
        reloadData();
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
      itemId: string,
      itemType: "Note" | "Video" | "Quiz" | "Code"
    ) => {
      try {
        const response = await deleteComponent(itemType, itemId);
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
    <div className="fixed left-0 w-3/12 bg-gray-white min-h-screen overflow-y-auto  mb-96">
      <div className="w-84 p-8 border-r bg-primary_light min-h-screen h-full border-gray-200  pb-20 mb-96 ">
        <div
          className={`mb-4 p-4 rounded-lg cursor-pointer transition-all ${
            selectedTopic.type === "Notifications"
              ? "bg-blue-100 border-l-4 border-blue-500"
              : "hover:bg-gray-100"
          }`}
          onClick={handleNotificationClick}
        >
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="font-semibold">Notifications & Discussions</span>
          </div>
        </div>

        {userRole === "student" && (
          <div className="mt-4 mb-10">
            <h3 className="text-lg font-semibold">Progress</h3>

            <div className="relative h-2 mt-2 bg-gray-300 rounded">
              <div
                className="absolute top-0 left-0 h-full bg-blue-600 rounded w-3/12"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <p className="my-2 text-sm text-gray-600">
              {progress}% of the course is completed
            </p>
          </div>
        )}
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
              isLastWeek={weekIndex === weeks.length - 1}
              permissions={permissions}
            />
          ))}
        {permissions.canCreateItems ? (
          <button
            className="w-full px-4 py-2 bg-blue-200 text-black text-sm font-semibold rounded hover:bg-blue-400"
            onClick={addNewWeek}
          >
            Add Week +
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Sidebar;
