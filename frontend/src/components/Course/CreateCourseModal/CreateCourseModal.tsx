import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SolidButton from "@/components/Buttons/SolidButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import CloseButton from "../../Buttons/CloseButton";
import CourseCategoryDropdown from "./CourseCategoryDropdown";
import CourseDifficultyDropdown from "./CourseDifficultyDropdown";
import {
  ModalClassesBG,
  SolidInputFieldClasses,
} from "../../components.styles";

export default function CreateCourseModal() {
  const [category, setCategory] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleInsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsOpen(false);
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const handleSubmit = (values: any) => {};

  return (
    <>
      <SecondaryButton onClick={toggleModal} text="Create Course" />

      {isOpen && (
        <div className={ModalClassesBG} onMouseDown={handleInsideClick}>
          <div
            className="bg-white p-10 px-md; rounded-lg shadow-lg relative max-w-3xl w-full"
            onMouseDown={handleOutsideClick}
          >
            <CloseButton onClick={toggleModal} />
            <h1 className="text-primary font-bold text-center text-2xl mb-8">
              Create Your Course
            </h1>
            <Formik
              initialValues={{ title: "" }}
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
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-primary mb-1"
                      >
                        Organization Name
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
                        placeholder="Enter the organization that course offered by"
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
                        value={category ?? ""}
                        onChange={handleCategoryChange}
                      />
                    </div>
                  </div>
                  <br />
                  <center>
                    <div className="mt-6 mb-2">
                      <SolidButton
                        type="submit"
                        text="S U B M I T"
                        onClick={() => {}}
                      />
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