"use client";
import XpCard from "@/components/Profile/XpCard/XpCard";
import React from "react";
import Profile from "@/components/Profile/Profile";
import CreateButton from "@/components/Buttons/CreateButton";
import AddXpCardModal from "@/components/Profile/XpCard/AddXpCardModal";

export default function page() {
  return (
    <>
      <div className="flex flex-col lg:flex-row w-full py-20">
        <Profile />
        <div className="relative  lg:w-full h-11/12  md:rounded-r-lg lg:basis-1/2 2xl:px-12 basis-1/3 mx-6 sm:ml-32 pt-32 lg:pt-0 lg:m-0">
          <div className="">
            <AddXpCardModal CardTitle="Work" />
            <XpCard />
            <XpCard />
          </div>

          <div className="py-3">
            <AddXpCardModal CardTitle="Education" />
            <XpCard />
          </div>
        </div>
      </div>
    </>
  );
}
