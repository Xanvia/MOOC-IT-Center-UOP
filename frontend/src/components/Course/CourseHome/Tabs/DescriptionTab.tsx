"use client";
import React, { useState } from "react";
import Image from "next/image";
import TextEditor from "../../CourseTextEditor";
import "react-quill/dist/quill.snow.css";
import EditButtonPrimary from "@/components/Buttons/EditButtonPrimary";
import { addDescription, addSpecifications } from "@/services/course.service";
import { toast } from "sonner";
import "react-quill/dist/quill.snow.css";

interface CourseDescProps {
  courseId: number;
  isEdit: boolean;
  courseTitle: string;
  description: string;
  specifications: string;
  headerImage: string;
  relaodData: () => void;
}

const DescriptionTab: React.FC<CourseDescProps> = ({
  relaodData,
  courseId,
  isEdit,
  courseTitle,
  description,
  specifications,
  headerImage,
}) => {
  const [editDescView, setEditDescView] = useState(false);
  const [editSpecView, setEditSpecView] = useState(false);

  const toggleDescView = () => {
    setEditDescView(!editDescView);
  };

  const toggleSpecView = () => {
    setEditSpecView(!editSpecView);
  };

  const handleDescSave = async (descriptionValue: string) => {
    try {
      const response = await addDescription(courseId, descriptionValue);
      toast.success(response.message);
      setEditDescView(false);
      relaodData();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSpecSave = async (specificationsValue: string) => {
    try {
      const response = await addSpecifications(courseId, specificationsValue);
      toast.success(response.message);
      setEditSpecView(false);
      relaodData();
    } catch (error: any) {
      toast.error(error.message);
    }
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
                <TextEditor
                  initialValue={description}
                  onClick={handleDescSave}
                />
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
                  className="ql-editor specifications"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </div>
            )}
            <div>
              <Image
                src={headerImage || ""}
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
                <TextEditor
                  initialValue={specifications}
                  onClick={handleSpecSave}
                />
              </div>
            ) : (
              <>
                {isEdit && (
                  <EditButtonPrimary text="E D I T" onClick={toggleSpecView} />
                )}
                <div
                  className="ql-editor specifications"
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
