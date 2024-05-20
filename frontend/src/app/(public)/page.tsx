"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Navbar from "@/components/Navbar/Navbar";
import Search from "@/components/Search/Search";
import CourseCard from "@/components/Course/CourseCard/CourseCard";

const course1 = "/images/course1.png";
const course2 = "/images/course2.png";
const course3 = "/images/course3.png";

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
          <CourseCard
            title="Computer Networks "
            description="The learning material on beginner-level website creation."
            image={course1}
          />
        </div>
        <div>
          <CourseCard
            title="Digital Marketing"
            description="Material on beginner marketing strategies and concepts"
            image={course2}
          />
        </div>
        <div>
          <CourseCard
            title="Data Analysis"
            description="Description 3"
            image={course3}
          />
        </div>
      </div>
    </div>
  );
}
