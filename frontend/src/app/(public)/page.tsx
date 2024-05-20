"use client"
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Navbar from "@/components/Navbar/Navbar";
import Search from "@/components/Search/Search";
import CourseCard from "@/components/Course/CourseCard";
export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("token"));

  const handleSignOut = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const user = Cookies.get("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} onSignOut={handleSignOut} />
      <Search />
    <div className="flex justify-center space-x-1">
        <div>
          <image></image>
          <CourseCard title="Course 1" description="Description 1" />
        </div>
        <div>
          <CourseCard title="Course 2" description="Description 2" />
        </div>
        <div>
          <CourseCard title="Course 3" description="Description 3" />
        </div>
    </div>
      
    </div>
  );
}
