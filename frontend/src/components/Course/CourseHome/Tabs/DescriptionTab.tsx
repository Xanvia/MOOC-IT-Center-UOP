"use client";
import React from "react";
import Image from "next/image";
import TextEditor from "../../CourseTextEditor";
import CourseDescEditModal from "../CourseDescEditModal";
import SolidButton from "@/components/Buttons/SolidButton";
import classes from './DescTab.module.css';
import { CourseData } from "../../course.types";



const headerImage = "/images/course-header.jpg";

interface CourseDescProps {
  courseData: CourseData
}

const DescriptionTab: React.FC<CourseDescProps> = ({
  courseData
}) => {
  return (
    <div className="lg:mx-32">
      <div className="py-14 px-3 sm:px-20 xl:mx-28  text-left bg-primary_light">
        <CourseDescEditModal courseData={courseData} />
        <div className="space-y-2">
          <div className="pt-4">
            <h1 className="text-2xl font-semibold text-primary">
              {courseData.name}
            </h1>
            <br />
            <p>{courseData.description}</p>
            <div>
              <Image
                src={headerImage}
                alt="Computer"
                layout="fil"
                width={1000}
                height={500}
                className="my-10"
                priority
              />
            </div>
            <div className={classes.specifications} dangerouslySetInnerHTML={{ __html: courseData.specifications }} />
          </div>
          <div className="pt-8">
            <h1 className="text-2xl mb-6 font-semibold text-primary text-center">
              Add More Informations
            </h1>
            <TextEditor />

            <div className="flex justify-end mt-8 ">
              <SolidButton type="submit" text="S A V E" onClick={() => {}} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionTab;
