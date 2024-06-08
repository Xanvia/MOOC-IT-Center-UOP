"use client";
import React from "react";
import Image from "next/image";
import ProfileInfo from "./ProfileInfo";
import EditProfileModal from "./EditProfile";
import { ProfileData, Work, Education } from "@/components/Profile/types";
import { ProfileBackground } from "../components.styles";
import Loader from "../Loarder/Loarder";

const DefaultProfileImage = "/images/52.jpg";

interface ProfileProps {
  profileData: ProfileData | undefined;
  reloadData: () => void;
}

const Profile: React.FC<ProfileProps> = ({ profileData, reloadData }) => {
  return (
    <div className="basis-1/2">
      <div className={ProfileBackground}>
        {profileData ? (
          <>
            <EditProfileModal userData={profileData} reloadData={reloadData} />
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
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Profile;
