"use client";
import React from "react";
import Image from "next/image";
import ProfileInfo from "./ProfileInfo";
import EditProfileModal from "./EditProfile";
const DefaultProfileImage = "/images/52.jpg";

interface ProfileProps {
  data: {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    birthdate: string;
    location: string;
  };
}

const Profile: React.FC<ProfileProps> = ({ data }) => {
  return (
    <div className="basis-1/2">
      <div className="relative bg-white min-h-full w-full sm:w-7/12 sm:ml-40 lg:ml-48 rounded-lg shadow-md py-14 flex flex-col items-center justify-center">
        <EditProfileModal />
        <Image
          src={DefaultProfileImage}
          alt="Profile Image"
          width={120}
          height={120}
          className="rounded-full ring-4 ring-primary_light"
        />
        <h1 className="text text-primary text-3xl pt-3">
          {data.firstname} {data.lastname}
        </h1>
        <ProfileInfo 
          email={data.email}
          phone={data.phone}
          birthdate={data.birthdate}
          location={data.location}
        />
      </div>
    </div>
  );
};

export default Profile;

