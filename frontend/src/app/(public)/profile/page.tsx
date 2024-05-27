import Navbar from "@/components/Navbar/Navbar";
import XpCard from "@/components/XpCard/XpCard";
import ProfileInfo from "@/components/Profile/ProfileInfo";
import React from "react";
import Profile from "@/components/Profile/Profile";

export default function page() {
  return (
    <>
      <div className="flex flex-row w-full py-20">
        <Profile />
        <div className="relative w-full h-11/12  md:rounded-r-lg md:basis-1/2 pl-12 pr-10 mr-28">
          <div className="border-b border-gray-400">
            <h1 className="ps-5  text-2xl text-primary font-bold ">Work</h1>
            <XpCard />
            <XpCard />
          </div>

          <div className="border-gray-400 py-3">
            <h1 className="ps-5  text-2xl text-primary font-bold">Education</h1>
            <XpCard />
          </div>
        </div>
      </div>
    </>
  );
}
