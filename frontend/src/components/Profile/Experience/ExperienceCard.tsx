"use client";
import React from "react";
import AddExperienceModal from "./ExperienceModal";
import { Work } from "../types";

interface props {
  workData: Work;
}

const ExperienceCard: React.FC<props> = ({ workData }) => {
  return (
    <div className="relative flex Box bg-white md:rounded-lg shadow-md border-2 px-4 py-4 h-40 sm:w-5/6 w-full my-5 mb-8">
      <AddExperienceModal CardTitle="Edit Work Experience" Action="Edit" />
      <div className="flex flex-col ml-4 w-full">
        <div className="text text-xl font-semibold border-b border-gray-300 pb-2 pt-1">
          <h1>{workData.company}</h1>
        </div>
        <div className="text text-gray-600 mt-4">
          <h1>{workData.position}</h1>
        </div>
        <div className="text mt-2 text-right font-medium mr-2">
          <h1>
            {workData.startDate} - {workData.endDate}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
