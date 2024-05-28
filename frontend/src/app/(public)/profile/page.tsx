"use client";
import React from "react";
import Profile from "@/components/Profile/Profile";
import ExperienceModal from "@/components/Profile/Experience/ExperienceModal";
import ExperienceCard from "@/components/Profile/Experience/ExperienceCard";
import EducationCard from "@/components/Profile/Education/EducatonCard";
import EducationModal from "@/components/Profile/Education/EducationModal";

import { getUserInfo } from "@/data/api";

interface User {}

export default function page() {

  const [user,setUser] = useState<User>(null);

  useInsertionEffect(){
    getUserInfo().then((res) => {
      setUser(res.data);
    }).catch((err) => {});
  },[]
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row w-full py-20">
        <Profile />
        <div className="relative  lg:w-full h-11/12  md:rounded-r-lg lg:basis-1/2 2xl:px-12 basis-1/3 mx-6 sm:ml-32 pt-32 lg:pt-0 lg:m-0">
          <div className="">
            <ExperienceModal
              CardTitle="Add Your Work Experience"
              Action="Add"
            />
            <ExperienceCard />
            <ExperienceCard />
          </div>
          <div className="py-3">
            <EducationModal
              CardTitle="Add Your Education Details"
              Action="Add"
            />
            <EducationCard />
          </div>
        </div>
      </div>
    </>
  );
}
