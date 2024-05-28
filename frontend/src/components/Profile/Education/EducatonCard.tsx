"use client";
import React from "react";
import EducationModal from "./EducationModal";

const EducationCard: React.FC = ({}) => {
  return (
    <div className="relative flex Box bg-white md:rounded-lg shadow-md border-2 px-4 py-4 h-40 sm:w-5/6 w-full my-5 mb-8">
      <EducationModal
        CardTitle="Add Education Details"
        ButtonText="Education"
      />
      <div className="flex flex-col ml-4 w-full">
        <div className="text text-xl font-semibold border-b border-gray-300 pb-2 pt-1">
          <h1> University of Peradeniya</h1>
        </div>
        <div className="text text-gray-600 mt-4">
          <h1> Bsc Hons in Computer Science </h1>
        </div>
        <div className="text mt-2 text-right font-medium mr-2">
          <h1>
            {" "}
            October <span className="text-primary">2020</span> - December{" "}
            <span className="text-primary">2021</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default EducationCard;
