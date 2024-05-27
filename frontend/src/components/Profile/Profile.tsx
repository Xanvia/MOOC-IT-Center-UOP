"use client";
import React from "react";
import Image from "next/image";
import ProfileInfo from "./ProfileInfo";
import EditButton from "../Buttons/EditButton";
const DefaultProfileImage = "/images/defaultuser.png";

export default function Profile() {
  return (
    <div className="basis-1/2">
      <div className="relative bg-white flex min-h-full w-7/12 ml-48 rounded-lg shadow-md py-14 flex flex-col items-center justify-center">
        <EditButton onClick={() => {}} />
        <Image
          src={DefaultProfileImage}
          alt="Profile Image"
          width={120}
          height={120}
          className="rounded-full border-primary border-2"
        />
        <h1 className="text text-primary text-3xl pt-3">John Doe</h1>
        <ProfileInfo />
      </div>
    </div>
  );
}
