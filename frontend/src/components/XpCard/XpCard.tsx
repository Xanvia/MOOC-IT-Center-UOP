"use client";
import React from "react";
import EditButton from "../Buttons/EditButton";

const XpCard: React.FC = ({}) => {
  return (
    <div className="relative flex Box bg-white md:rounded-lg shadow-md border-2 py-3 px-2 h-40 w-5/6 my-5">
      <EditButton onClick={() => {}} />

      <div className="flex flex-col ml-4 w-full">
        <div className="text text-xl font-semibold border-b border-gray-300 pb-3 pt-1">
          <h1> University of Peradeniya</h1>
        </div>
        <div className="text text-gray-600 mt-3">
          <h1> Lecturer | Faculty Of Science </h1>
        </div>
        <div className="text mt-4 text-right font-medium mr-2">
          <h1> October <span className="text-primary">2020</span> - December <span className="text-primary">2021</span></h1>
        </div>
      </div>
    </div>
  );
};

export default XpCard;
