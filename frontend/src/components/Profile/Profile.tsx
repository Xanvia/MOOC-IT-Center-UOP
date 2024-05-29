"use client";
import React from "react";
import Image from "next/image";
import ProfileInfo from "./ProfileInfo";
import EditProfileModal from "./EditProfile";
import { ProfileData } from "@/components/Profile/types";
const DefaultProfileImage = "/images/52.jpg";
interface ProfileProps {
  userData: ProfileData;
}

const Profile: React.FC<ProfileProps> = ({ userData }) => {
  return (
    <div className="basis-1/2">
      <div className="relative bg-white min-h-full w-full sm:w-7/12 sm:ml-40 lg:ml-48 rounded-lg shadow-md py-14 flex flex-col items-center justify-center">
        <EditProfileModal userData={userData} />
        <Image
          src={
            userData.profile_image ||
            userData.profile_picture ||
            DefaultProfileImage
          }
          alt="Profile Image"
          width={120}
          height={120}
          className="rounded-full ring-4 ring-primary_light"
        />
        <h1 className="text text-primary text-3xl pt-3">
          {userData.firstname} {userData.lastname}
        </h1>
        <ProfileInfo
          email={userData.email}
          mobile_nubmer={userData.mobile_number}
          birth_date={userData.birth_date}
          location={userData.country.label}
          description={userData.description}
        />
      </div>
    </div>
  );
};

export default Profile;
