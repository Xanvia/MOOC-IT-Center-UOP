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

        <div className=""></div>
      </div>
    </>
  );
}
