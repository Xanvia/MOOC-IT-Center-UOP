import React, { useState } from "react";
import CourseCategoryDropdown from "@/components/CreateCourseModal/CourseCategoryDropdown";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SolidButton from "@/components/Buttons/SolidButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import CloseButton from "@/components/Buttons/CloseButton";
import { ModalClassesBG } from "@/components/components.styles";
import EditButtonPrimary from "@/components/Buttons/EditButtonPrimary";

export default function CourseDescEditModal() {
  const [category, setCategory] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(true);
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
      <EditButtonPrimary text="E D I T" onClick={ toggleModal} />

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
                  <CourseCategoryDropdown
                    value={category ?? ""}
                    onChange={handleCategoryChange}
                  />
                  <div className="mb-4">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-primary mb-1"
                    >
                      Institute
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
                      placeholder="Enter Institute"
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-primary mb-1"
                    >
                      Level
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
                      placeholder="ex:Beginer"
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-primary mb-1"
                    >
                      Course Duration
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
                      placeholder="No of weeks"
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  
                  <br />
                  
                    <div className="mt-4 mb-2 flex justify-end">
                      <SolidButton
                        type="submit"
                        text="D O N E"
                        onClick={() => {}}
                      />
                    </div>
                  
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
}