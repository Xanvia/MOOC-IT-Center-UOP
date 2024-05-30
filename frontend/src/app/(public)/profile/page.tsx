"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Profile from "@/components/Profile/Profile";
import ExperienceModal from "@/components/Profile/Experience/ExperienceModal";
import ExperienceCard from "@/components/Profile/Experience/ExperienceCard";
import EducationCard from "@/components/Profile/Education/EducatonCard";
import EducationModal from "@/components/Profile/Education/EducationModal";
import { Work, Education, ProfileData } from "@/components/Profile/types";

const dummyEdu = {
  id: 1,
  institution: "Add your Education Experience Here",
  degree: "Bsc Hons in Computer Science",
  start_date: "2019-01-",
  end_date: "2023-01-",
};

export default function ProfilePage() {
  const [work, setWork] = useState<Work[]>([]);
  const [education, setEducation] = useState<Education[]>([]);

  return (
    <>
      <div className="flex flex-col lg:flex-row w-full py-20">
        <Profile setEducation={setEducation} setWork={setWork} />
        <div className="relative  lg:w-full h-11/12  md:rounded-r-lg lg:basis-1/2 2xl:px-12 basis-1/3 mx-6 sm:ml-32 pt-32 lg:pt-0 lg:m-0">
          <div className="min-h-[300px]">
            <ExperienceModal
              CardTitle="Add Your Work Experience"
              Action="Add"
            />
            {work && work.length > 0 ? (
              work.map((workItem) => (
                <ExperienceCard key={workItem.id} workData={workItem} />
              ))
            ) : (
              <div className="py-10 text-xl">
                <p>Add your work experience here</p>
              </div>
            )}
          </div>
          <div className="py-3">
            <EducationModal
              CardTitle="Add Your Education Details"
              Action="Add"
            />
            {education && education.length > 0 ? (
              education.map((eduItem) => (
                <EducationCard key={eduItem.id} eduData={eduItem} />
              ))
            ) : (
              <EducationCard eduData={dummyEdu} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
