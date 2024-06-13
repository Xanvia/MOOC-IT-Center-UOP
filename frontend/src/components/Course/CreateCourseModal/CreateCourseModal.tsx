import React, { useState } from "react";
import CourseCategoryDropdown from "@/components/Course/CreateCourseModal/CourseCategoryDropdown";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SolidButton from "@/components/Buttons/SolidButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import CloseButton from "../../Buttons/CloseButton";
import { ModalClassesBG,SolidInputFieldClasses } from "../../components.styles";

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
            className="bg-white p-10 px-24 rounded-lg shadow-lg relative max-w-3xl w-full"
            onMouseDown={handleOutsideClick}
          >
            <CloseButton onClick={toggleModal} />
            <Formik
              initialValues={{ title: "" }}
              validationSchema={Yup.object({
                title: Yup.string().required("Course title is required"),
              })}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <Form>
                  <div className="mb-4">
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
                      className={`${SolidInputFieldClasses}  ${
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
                  <CourseCategoryDropdown
                    value={category ?? ""}
                    onChange={handleCategoryChange}
                  />
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
