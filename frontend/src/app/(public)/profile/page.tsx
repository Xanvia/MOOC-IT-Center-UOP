"use client";
import React, { useState, useEffect } from "react";
import Profile from "@/components/Profile/Profile";
import ExperienceModal from "@/components/Profile/Experience/WorkExperienceModal";
import ExperienceCard from "@/components/Profile/Experience/WorkExperienceCard";
import EducationCard from "@/components/Profile/Education/EducatonCard";
import EducationModal from "@/components/Profile/Education/EducationModal";
import { Work, Education, ProfileData } from "@/components/Profile/types";
import { fetchProfileData } from "@/services/user.service";

export default function ProfilePage() {
  const [work, setWork] = useState<Work[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [profileData, setProfileData] = useState<ProfileData | undefined>(
    undefined
  );
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const data = await fetchProfileData();
        setWork(data.work_experiences);
        setEducation(data.educations);
        setProfileData(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadProfileData();
  }, [reload]);

  const reloadData = () => {
    setReload((prevState) => !prevState);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row w-full py-20">
        <Profile reloadData={reloadData} profileData={profileData} />
        <div className="relative  lg:w-full h-11/12  md:rounded-r-lg lg:basis-1/2 2xl:px-12 basis-1/3 mx-6 sm:ml-32 pt-32 lg:pt-0 lg:m-0">
          <div className="min-h-[300px]">
            <EducationModal
              CardTitle="Add Your Education Details"
              reloadData={reloadData}
            />
            {education && education.length > 0 ? (
              education.map((eduItem) => (
                <EducationCard
                  key={eduItem.id}
                  eduData={eduItem}
                  reload={reloadData}
                />
              ))
            ) : (
              <EducationCard eduData={education[0]} reload={reloadData} />
            )}
          </div>
          <div className="py-3">
            <ExperienceModal
              CardTitle="Add Your Work Experience"
              reloadData={reloadData}
            />
            {work && work.length > 0 ? (
              work.map((workItem) => (
                <ExperienceCard
                  key={workItem.id}
                  workData={workItem}
                  reload={reloadData}
                />
              ))
            ) : (
              <div className="py-10 text-xl">
                <p>Add your work experience here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
