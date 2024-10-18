"use client";
import React from "react";
import EducationModal from "./EducationModal";
import { Education } from "../types";
import { getFormattedDate } from "@/utils/FomatMonth";

interface props {
  eduData: Education;
  reload: () => void;
}

const EducationCard: React.FC<props> = ({ eduData, reload }) => {
  if (!eduData) {
    return (
      <div className="relative flex Box bg-white md:rounded-lg shadow-md border-2 px-4 py-4 h-40 sm:w-5/6 w-full my-5 mb-8">
        <div className="flex flex-col ml-4 w-full">
          <div className="text text-xl font-semibold border-b border-gray-300 pb-2 pt-1">
            <h1>Add your Education Experience Here</h1>
          </div>
          <div className="text text-gray-600 mt-4">
            <h1>Add your Degree/Diploma Here</h1>
          </div>
          <div className="text mt-2 text-right text-gray-500 font-medium mr-2">
            <h1>
              <span className="mr-5 text-primary">
                {getFormattedDate(new Date().toISOString())}
              </span>
              To
              <span className="ml-5 text-primary">Present</span>
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex Box bg-white md:rounded-lg shadow-md border-2 px-4 py-4 h-40 sm:w-5/6 w-full my-5 mb-8">
      <EducationModal
        CardTitle="Edit Education Details"
        eduData={eduData}
        reloadData={reload}
      />
      <div className="flex flex-col ml-4 w-full">
        <div className="text text-xl font-semibold border-b border-gray-300 pb-2 pt-1">
          <h1>{eduData.institution}</h1>
        </div>
        <div className="text text-gray-600 mt-4">
          <h1>
            {eduData.degree} in {eduData.field_of_study}
          </h1>
        </div>
        <div className="text mt-2 text-right text-gray-500 font-medium mr-2">
          <h1>
            <span className="mr-5 text-primary">
              {getFormattedDate(eduData.start_date)}
            </span>
            To
            <span className="ml-5 text-primary">
              {eduData.end_date && eduData.end_date !== "null"
                ? getFormattedDate(eduData.end_date)
                : "Present"}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default EducationCard;
