import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SolidButton from "@/components/Buttons/SolidButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import CloseButton from "../../Buttons/CloseButton";
import CourseCategoryDropdown from "./CourseCategoryDropdown";
import CourseDifficultyDropdown from "./CourseDifficultyDropdown";
import { ModalClassesBG } from "../../components.styles";
import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "@/utils/constants";
import DropDownInstitution from "../../DropDown/DropDownUni";

export default function CreateCourseModal() {
  const [category, setCategory] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [institution, setInstitution] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleInsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsOpen(false);
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
    setInstitution("");
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const handleDifficultyChange = (value: string) => {
    setDifficulty(value);
  };

  const handleSubmit = (values: any) => {
    axios
      .post(`${API_URL}/course/`, {
        title: values.title,
        institution: institution,
        category: category,
        difficulty: difficulty,
      })
      .then((response) => {
        toast.success("Course created successfully!");
        setIsOpen(false);
      })
      .catch((error) => {
        const errorMessage = error.response?.data.message ?? "Network error";
        toast.error(errorMessage);
      });
  };

  return (
    <>
      <SecondaryButton onClick={toggleModal} text="Create Course" />
      {isOpen && (
        <div className={ModalClassesBG} onMouseDown={handleInsideClick}>
          <div
            className="bg-white p-10 px-md rounded-lg shadow-lg relative max-w-3xl w-full"
            onMouseDown={handleOutsideClick}
          >
            <CloseButton onClick={toggleModal} />
            <h1 className="text-primary font-bold text-center text-2xl mb-8">
              Create Your Course
            </h1>
            <Formik
              initialValues={{ title: "", institution: "" }}
              validationSchema={Yup.object({
                title: Yup.string().required("Course title is required"),
              })}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <Form>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2 mb-4 md:px-5 lg:px-10">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-primary mb-1"
                      >
                        Course Title
                      </label>
                      <Field
                        type="text"
                        id="title"
                        name="title"
                        className={`mt-1 block w-full border border-primary rounded-md shadow-sm p-2 ${
                          formik.touched.title && formik.errors.title
                            ? "border-primary"
                            : ""
                        }`}
                        placeholder="Enter course title"
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="col-span-2 mb-4 md:px-5 lg:px-10">
                      <DropDownInstitution
                        label="Organization Name"
                        addSelection={setInstitution}
                        selectedInstitution={institution as string}
                      />
                    </div>
                    <div className="md:px-5 lg:px-10 col-span-2 sm:col-span-1">
                      <CourseCategoryDropdown
                        value={category ?? ""}
                        onChange={handleCategoryChange}
                      />
                    </div>
                    <div className="md:px-5 lg:px-10 col-span-2 sm:col-span-1">
                      <CourseDifficultyDropdown
                        value={difficulty ?? ""}
                        onChange={handleDifficultyChange}
                      />
                    </div>
                  </div>
                  <br />
                  <center>
                    <div className="mt-6 mb-2">
                      <SolidButton type="submit" text="S U B M I T" />
                    </div>
                  </center>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
}
