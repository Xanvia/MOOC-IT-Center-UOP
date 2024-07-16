"use client";
import React, { lazy, useState } from "react";
import { CourseData } from "../../course.types";
import CourseOutcomeComponent from "./CourseOutcomesTab";

const CourseContent = lazy(
  () => import("@/components/Course/CourseHome/CourseContent")
);
const CourseOutcomes = lazy(
  () => import("@/components/Course/CourseHome/CourseOutcomes")
);
const DescriptionTab = lazy(() => import("./DescriptionTab"));
const InstructorTab = lazy(() => import("./InstructorTab"));

interface CourseDetailsTabsProps {
  courseData: CourseData;
  isEdit: boolean;
  reloadData: () => void;
}

const CourseDetailsTabs = ({ courseData, isEdit,reloadData }: CourseDetailsTabsProps) => {
  const [activeTab, setActiveTab] = useState("Description");
  const [outcomes, setOutcomes] = useState(courseData.outcomes)

  const addOutcome = (outcome:string) => {
    setOutcomes([...outcomes, outcome]);
  };
  const handleRemoveOutcome = (index: number) => {
    const newOutcomes = outcomes.filter((_, i) => i !== index);
    setOutcomes(newOutcomes);
  };

  const tabs = ["Description", "Instructor", "Syllabus", "Outcomes"];

  return (
    <>
      <div className="w-full">
        <div className="flex border-b justify-center">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`xl:mx-16 md:mx-8 px-1 sm:px-8 py-2  font-semibold text-gray-700 border-b-2 transition-colors duration-300 ${
                activeTab === tab
                  ? "border-blue-800 text-blue-500"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      {activeTab === "Description" && (
        <DescriptionTab
          courseId={courseData.id}
          isEdit={isEdit}
          headerImage={courseData.header_image}
          courseTitle={courseData.name}
          specifications={courseData.specifications}
          description={courseData.description}
          relaodData={reloadData}
        />
      )}
      {activeTab === "Instructor" && <InstructorTab />}
      {activeTab !== "Outcomes" && <CourseContent />}
      {/* <CourseOutcomes outcomes={courseData.outcomes} /> */}
      <CourseOutcomeComponent outcomes={outcomes} addOutcome={addOutcome} removeOutcome={handleRemoveOutcome}/>
    </>
  );
};

export default CourseDetailsTabs;
