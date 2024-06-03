"use client";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import CourseCard from "@/components/Course/CourseCard/CourseCard";
import React, { useState } from "react";
import CreateCourseModal from "@/components/CreateCourseModal/CreateCourseModal";
import CourseCategoryDropdown from "@/components/CreateCourseModal/CourseCategoryDropdown";

const course2 = "/images/course2.png";
const course3 = "/images/course3.png";
const course5 = "/images/course5.png";

export default function Courses() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState("");

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  return (
    <>
      <div className="container mx-auto px-4 mt-20">
        <div className="mx-36 flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Courses</h1>
          <SecondaryButton onClick={toggleModal} text="Create Course" />
        </div>

        <div className="grid grid-cols-1 py-10 ml-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 justify-center items-center mx-10 sm:mx-36 lg:mx-36 gap-4 lg:gap-4 2xl:gap-10">
          <CourseCard
            title="Digital Marketing"
            description="Material on beginner marketing strategies and concepts"
            image={course2}
          />
          <CourseCard
            title="Data Analysis"
            description="Description 3"
            image={course3}
          />
          <CourseCard
            title="Digital Marketing"
            description="Material on beginner marketing strategies and concepts"
            image={course5}
          />
          <CourseCard
            title="Digital Marketing"
            description="Material on beginner marketing strategies and concepts"
            image={course2}
          />
        </div>
      </div>

      <CreateCourseModal isOpen={isModalOpen} onClose={toggleModal}>
        <center>
        <h2 className="text-2xl text-primary font-bold mb-4">Create Course</h2>
        </center>
        <form>
          {/* Adjusted form fields */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-primary mb-1">Course Title</label>
            <input
              type="text"
              className="mt-1 block w-full border border-primary rounded-md shadow-sm p-2"
              placeholder="Enter course title"
            />
          </div>
          <CourseCategoryDropdown value={category} onChange={handleCategoryChange} />
          <br/>
          
          <center>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Submit
            </button>
          </center>
        </form>
        
      </CreateCourseModal>
    </>
  );
}
