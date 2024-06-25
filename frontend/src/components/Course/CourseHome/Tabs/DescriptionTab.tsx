"use client";
import React from "react";
import Image from "next/image";
import TextEditor from "../../CourseTextEditor";
import CourseDescEditModal from "../CourseDescEditModal";
import SolidButton from "@/components/Buttons/SolidButton";

const headerImage = "/images/course-header.jpg";

const DescriptionTab: React.FC = () => {
  return (
    <div className="lg:mx-32">
      <div className="py-14 px-3 sm:px-20 xl:mx-28  text-left bg-primary_light">
        <CourseDescEditModal />
        <div className="space-y-2">
          <div className="pt-4">
            <h1 className="text-2xl font-semibold text-primary">
              Basic Web Development
            </h1>
            <br />
            <p>
              Web programming or web development is a term closely related to
              websites and the internet. Why is that? Because web programming is
              one of the processes involved in creating websites for internet
              purposes, which are commonly referred to as the World Wide Web
              (WWW). The term WWW is well-known because it is, after all, the
              most popular internet service today.
            </p>
            <br />
            <p>
              In this course, you will be taught how to create websites with
              industry standards. Web programming or web development is a term
              closely related to websites and the internet. Web programming or
              web development is a term closely related to websites and the
              internet.Here, you will learn about HTML, CSS, and JavaScript,
              which are the fundamental foundations in website development. Web
              programming or web development is a term closely related to
              websites and the internet. Why is that? Because web programming is
              one of the processes involved in creating websites for internet
              purposes, which are commonly referred to as the World Wide Web
              (WWW). The term WWW is well-known because it is, after all, the
              most popular internet service today.
            </p>
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

            <div className="mt-14 text-2xl font-semibold text-primary">
              <h1>Specifications & Softwares</h1>
            </div>
            <ul className="mt-4 list-disc list-inside space-y-2">
              <li>PC/Laptop 1 GB Ram dan 2 GB free disk</li>
              <li>Web browser</li>
              <li>Text Editor (VsCode)</li>
              <li>Internet access</li>
            </ul>
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
