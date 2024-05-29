"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ProfileInfo from "./ProfileInfo";
import EditProfileModal from "./EditProfile";
import { ProfileData, Work, Education } from "@/components/Profile/types";
import axios from "axios";
import Cookies from "js-cookie";
import { API_URL } from "@/utils/constants";
const DefaultProfileImage = "/images/52.jpg";
import { toast } from "sonner";

const token = Cookies.get("token");
interface ProfileProps {
  setWork: React.Dispatch<React.SetStateAction<Work[]>>;
  setEducation: React.Dispatch<React.SetStateAction<Education[]>>;
}

const Profile: React.FC<ProfileProps> = ({ setEducation, setWork }) => {
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
        setWork(response.data.data.work_experiences);
        setEducation(response.data.data.educations);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className="basis-1/2">
      <div className="relative bg-white min-h-full w-full sm:w-7/12 sm:ml-40 lg:ml-48 rounded-lg shadow-md py-14 flex flex-col items-center justify-center">
        {profileData ? (
          <>
            <EditProfileModal
              userData={profileData}
              setProfileData={setProfileData}
            />
            <Image
              src={
                profileData.profile_image ||
                profileData.profile_picture ||
                DefaultProfileImage
              }
              alt="Profile Image"
              width={120}
              height={120}
              className="rounded-full ring-4 ring-primary_light"
            />
            <h1 className="text text-primary text-3xl pt-3">
              {profileData.firstname} {profileData.lastname}
            </h1>
            <ProfileInfo
              email={profileData.email}
              mobile_nubmer={profileData.mobile_number}
              birth_date={profileData.birth_date}
              location={profileData.country.label}
              description={profileData.description}
            />
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Profile;
