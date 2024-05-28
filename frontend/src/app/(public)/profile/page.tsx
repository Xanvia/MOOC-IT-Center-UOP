import Navbar from "@/components/Navbar/Navbar";
import WorkXpCard from "@/components/XpCard/WorkXpCard";
import EduXpCard from "@/components/XpCard/EduXpCard";
import ProfileInfo from "@/components/Profile/ProfileInfo";
import React from "react";
import Profile from "@/components/Profile/Profile";

export default function page() {
  return (
    <>
      <div className="flex flex-col lg:flex-row w-full py-20">
        <Profile />
        <div className="relative  lg:w-full h-11/12  md:rounded-r-lg lg:basis-1/2 2xl:px-12 basis-1/3 mx-6 sm:ml-32 pt-32 lg:pt-0 lg:m-0">
          <div className="">
            <h1 className="ps-5  text-2xl text-primary font-bold ">Work</h1>
            <WorkXpCard />
            <WorkXpCard />
          </div>

          <div className="py-3">
            <h1 className="ps-5  text-2xl text-primary font-bold">Education</h1>
            <EduXpCard />
          </div>
        </div>
      </div>
    </>
  );
}
