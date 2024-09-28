"use client";
import React, { useEffect, useState } from "react";
import Note from "@/components/Course/Note/Note";
import CourseVideo from "@/components/Course/CourseVideo/CourseVideo";
import { useSelectedTopic } from "@/contexts/SidebarContext";
import { Item, Week, Chapter } from "@/components/Course/types";
import YellowButton from "@/components/Buttons/YellowButton";
import Quiz from "@/components/Course/Quiz/Quiz";
import { startComponent } from "@/services/course.service";
import { toast } from "sonner";
import { useGlobal } from "@/contexts/store";
import { markAsComplete } from "@/services/course.service";
import CodingQ from "@/components/Course/CodingQ/CodingQ";

const Page: React.FC = () => {
  const {
    selectedTopic,
    setSelectedTopic,
    weeks,
    setWeeks,
    expandedWeek,
    setExpandedWeek,
    setExpandedSubtopics,
    expandedSubtopics,
    updateItemStatus,
    permissions,
  } = useSelectedTopic();
  const [item, setItem] = useState<Item>({ ...selectedTopic });
  const [isFinished, setIsFinished] = useState<boolean>(true);
  const { userRole } = useGlobal();

  useEffect(() => {
    setItem({ ...selectedTopic });
  }, [selectedTopic]);

  useEffect(() => {
    if (!item.has_started && item.id !== 0 && userRole === "student") {
      try {
        startComponent(String(item.id));
        updateItemStatus(item.id, { has_started: true });
      } catch {
        // console.log("Starting Component");
      }
    }
  }, [item]);

  const findCurrentItemIndex = (weeks: Week[], currentItem: Item) => {
    for (let weekIndex = 0; weekIndex < weeks.length; weekIndex++) {
      const week = weeks[weekIndex];
      if (!week.chapters) continue;
      for (
        let chapterIndex = 0;
        chapterIndex < week.chapters.length;
        chapterIndex++
      ) {
        const chapter = week.chapters[chapterIndex];
        if (!chapter.items) continue;
        const itemIndex = chapter.items.findIndex(
          (item) => item.id === currentItem.id
        );
        if (itemIndex !== -1) {
          return { weekIndex, chapterIndex, itemIndex };
        }
      }
    }
    return null;
  };

  const handlePrev = () => {
    const currentIndex = findCurrentItemIndex(weeks, item);
    if (!currentIndex) return;

    let { weekIndex, chapterIndex, itemIndex } = currentIndex;

    if (itemIndex > 0) {
      setSelectedTopic(
        weeks[weekIndex]?.chapters[chapterIndex]?.items?.[itemIndex - 1] ??
          selectedTopic
      );
    } else if (chapterIndex > 0) {
      const prevChapter = weeks[weekIndex]?.chapters[chapterIndex - 1];
      setSelectedTopic(
        prevChapter?.items?.[prevChapter.items.length - 1] ?? selectedTopic
      );
      setExpandedSubtopics((prev) => ({ ...prev, [chapterIndex - 1]: true }));
    } else if (weekIndex > 0) {
      const prevWeek = weeks[weekIndex - 1];
      const prevChapter = prevWeek?.chapters[prevWeek.chapters.length - 1];
      setSelectedTopic(
        prevChapter?.items?.[prevChapter.items.length - 1] ?? selectedTopic
      );
      setExpandedWeek(weekIndex - 1);
      setExpandedSubtopics({ [prevWeek.chapters.length - 1]: true });
    }
  };

  const handleNext = () => {
    if (!isFinished && userRole === "student") return;

    if (item.completed == false && userRole === "student") {
      try {
        console.log(item.id);
        markAsComplete(String(item.id));
        updateItemStatus(item.id, { completed: true });
        toast.success("Marked as completed");
      } catch {
        toast.error("Error marking as completed");
      }
    }

    const currentIndex = findCurrentItemIndex(weeks, item);
    if (!currentIndex) return;

    let { weekIndex, chapterIndex, itemIndex } = currentIndex;

    if (
      itemIndex <
      (weeks[weekIndex]?.chapters[chapterIndex]?.items?.length ?? 0) - 1
    ) {
      setSelectedTopic(
        weeks[weekIndex]?.chapters[chapterIndex]?.items?.[itemIndex + 1] ??
          selectedTopic
      );
    } else if (chapterIndex < (weeks[weekIndex]?.chapters?.length ?? 0) - 1) {
      setSelectedTopic(
        weeks[weekIndex]?.chapters[chapterIndex + 1]?.items?.[0] ??
          selectedTopic
      );
      setExpandedSubtopics((prev) => ({ ...prev, [chapterIndex + 1]: true }));
    } else if (weekIndex < weeks.length - 1) {
      setSelectedTopic(
        weeks[weekIndex + 1]?.chapters?.[0]?.items?.[0] ?? selectedTopic
      );
      setExpandedWeek(weekIndex + 1);
      setExpandedSubtopics({ 0: true });
    }
  };

  // const isLastItem = () => {
  //   const lastWeek = weeks[weeks.length - 1];
  //   const lastChapter = lastWeek?.chapters?.[lastWeek.chapters.length - 1];
  //   const lastItem = lastChapter?.items?.[lastChapter.items.length - 1];
  //   return item.id === lastItem?.id;
  // };
  return (
    <div className="flex-grow p-4 mb-96 ml-96" key={item.id}>
      {item.type === "Note" ? (
        <Note selectedTopic={item} permissions={permissions} />
      ) : item.type === "Video" ? (
        <CourseVideo
          videoURL={item.content.video_link}
          title={item.name}
          id={item.id}
          mcqs={item.content.quizzes}
          permissions={permissions}
          isCompleted={item.completed}
        />
      ) : item.type === "Quiz" ? (
        <>
          <Quiz item={item} permissions={permissions} />
          {/* <CodingQ /> */}
        </>
      ) : (
        <div>No content available</div>
      )}
      <div className="flex justify-between mt-6 mx-32">
        <YellowButton text="Prev" onClick={handlePrev} />
        <YellowButton text="Next" onClick={handleNext} />
      </div>
    </div>
  );
};

export default Page;
