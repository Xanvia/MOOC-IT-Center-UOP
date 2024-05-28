"use client";
import ExperienceCard from "@/components/Profile/Experience/ExperienceCard";
import React from "react";
import Profile from "@/components/Profile/Profile";
import AddExperienceModal from "@/components/Profile/Experience/ExperienceModal";

export default function page() {
  return (
    <>
      <div className="flex flex-col lg:flex-row w-full py-20">
        <Profile />
        <div className="relative  lg:w-full h-11/12  md:rounded-r-lg lg:basis-1/2 2xl:px-12 basis-1/3 mx-6 sm:ml-32 pt-32 lg:pt-0 lg:m-0">
          <div className="">
            <AddExperienceModal
              CardTitle="Add Your Work Experience"
              ButtonText="Work"
            />
            <ExperienceCard />
            <ExperienceCard />
          </div>
          <div className="py-3">
            <AddExperienceModal
              ButtonText="Education"
              CardTitle="Add Your Education Details"
            />
            <ExperienceCard />
          </div>
        </div>
      </div>
    </>
  );
}
