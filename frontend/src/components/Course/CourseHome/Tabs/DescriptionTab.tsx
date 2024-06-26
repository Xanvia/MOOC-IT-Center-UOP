"use client";
import React, { useState } from "react";
import Image from "next/image";
import TextEditor from "../../CourseTextEditor";
import SolidButton from "@/components/Buttons/SolidButton";
import EditButtonPrimary from "@/components/Buttons/EditButtonPrimary";
import classes from "./DescTab.module.css";

const headerImage = "/images/course-header.jpg";

interface CourseDescProps {
  isEdit: boolean;
  courseTitle: string;
  description: string;
  specifications: string;
}

const DescriptionTab: React.FC<CourseDescProps> = ({
  isEdit,
  courseTitle,
  description,
  specifications,
}) => {
  const [editDescView, setEditDescView] = useState(false);
  const [editSpecView, setEditSpecView] = useState(false);

  const toggleDescView = () => {
    setEditDescView(!editDescView);
  };

  const toggleSpecView = () => {
    setEditSpecView(!editSpecView);
  };

  return (
    <div className="lg:mx-32">
      <div className="py-14 px-3 sm:px-20 xl:mx-28  text-left bg-primary_light">
        <div className="space-y-2">
          <div className="pt-4">
            {editDescView ? (
              <React.Fragment>
                <h1 className="text-xl mb-6 font-semibold text-primary text-center">
                  Add Course Description
                </h1>
                <TextEditor initialValue={description} />
                <div className="flex justify-end mt-8">
                  <SolidButton
                    type="submit"
                    text="S A V E"
                    onClick={toggleDescView}
                  />
                </div>
              </React.Fragment>
            ) : (
              <div>
                <h1 className="text-2xl font-semibold text-primary">
                  {courseTitle}
                </h1>
                <div className="mt-6">
                  {isEdit && (
                    <EditButtonPrimary
                      text="E D I T"
                      onClick={toggleDescView}
                    />
                  )}
                </div>

                <br />
                <div
                  className={classes.specifications}
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </div>
            )}
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
            {editSpecView ? (
              <div className="pt-8">
                <TextEditor initialValue={specifications} />
                <div className="flex justify-end mt-8">
                  <SolidButton
                    type="submit"
                    text="S A V E"
                    onClick={toggleSpecView}
                  />
                </div>
              </div>
            ) : (
              <>
                {isEdit && (
                  <EditButtonPrimary text="E D I T" onClick={toggleSpecView} />
                )}
                <div
                  className={classes.specifications}
                  dangerouslySetInnerHTML={{ __html: specifications }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionTab;
