"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Profile from "@/components/Profile/Profile";
import ExperienceModal from "@/components/Profile/Experience/ExperienceModal";
import ExperienceCard from "@/components/Profile/Experience/ExperienceCard";
import EducationCard from "@/components/Profile/Education/EducatonCard";
import EducationModal from "@/components/Profile/Education/EducationModal";
import { Work, Education, ProfileData } from "@/components/Profile/types";
import Cookies from "js-cookie";
import { API_URL } from "@/utils/constants";

const token = Cookies.get("token");

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/profile/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfileData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <>
      <div className="flex flex-col lg:flex-row w-full py-20">
        {profileData && <Profile userData={profileData} />}
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
