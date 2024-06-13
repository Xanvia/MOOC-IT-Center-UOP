import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SolidButton from "@/components/Buttons/SolidButton";
import CloseButton from "@/components/Buttons/CloseButton";
import { ModalClassesBG } from "@/components/components.styles";
import EditButtonPrimary from "@/components/Buttons/EditButtonPrimary";
import DropDownInstitution from "@/components/DropDown/DropDownUni";
import {
  InputFieldClasses,
  InputInnerDiv,
  InputOuterDiv,
} from "@/components/components.styles";

export default function CourseDescEditModal() {
  const [category, setCategory] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [selectedInstitution, setSelectedInstitution] = useState<string | null>(
    null
  );
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

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <>
      <EditButtonPrimary text="E D I T" onClick={toggleModal} />

      {isOpen && (
        <div className={ModalClassesBG} onMouseDown={handleInsideClick}>
          <div
            className="bg-white p-10 rounded-lg shadow-lg relative max-w-3xl w-full"
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
                  <div className="pt-8 grid grid-cols-1 gap-4 mx-4">
                    <div className={InputOuterDiv}>
                      <div className={InputInnerDiv}>
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
                    </div>
                  </div>

                  <DropDownInstitution
                    addSelection={(value: string) =>
                      setSelectedInstitution(value)
                    }
                    selectedInstitution={selectedInstitution ?? ""}
                  />
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

                  <br />

                  <div className={InputOuterDiv}>
                    <div className={`h-20 ${InputInnerDiv} `}>
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-primary mb-1"
                      >
                        Description
                      </label>

                      <Field
                        as="textarea"
                        name="description"
                        className={InputFieldClasses}
                        placeholder=" "
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="top-0 left-0 text-red-600 text-xs"
                      />
                    </div>
                  </div>

                  <div className="mt-10 mb-2 flex justify-end">
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
