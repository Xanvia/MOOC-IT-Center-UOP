"use client";
import CreateButton from "@/components/Buttons/CreateButton";
import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  InputFieldClasses,
  InputLabel,
  InputInnerDiv,
  InputOuterDiv,
} from "@/components/components.styles";

import {
  ModalClassesBG,
  XpCardModalClasses,
} from "@/components/components.styles";
import EditButton from "@/components/Buttons/EditButton";

interface Props {
  CardTitle: string;
  Action: string;
}

const EducationModal: React.FC<Props> = ({ CardTitle, Action }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleInsideClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {Action === "Edit" ? (
        <EditButton onClick={toggleModal} />
      ) : (
        <CreateButton onClick={toggleModal} text="Education" />
      )}

      {isOpen && (
        <div
          onMouseDown={handleInsideClick}
          className={`${ModalClassesBG} bg-opacity-10`}
        >
          <div onMouseDown={handleOutsideClick} className={XpCardModalClasses}>
            <div className="text-xl font-bold text-[#072569] text-center mt-2 mb-2 mx-0">
              {CardTitle}
            </div>
            <Formik
              initialValues={{
                company: "",
                position: "",
              }}
              validationSchema={Yup.object({
                company: Yup.string().required("Required"),
                position: Yup.string().required("Required"),
              })}
              onSubmit={() => {}}
            >
              <Form>
                <div className="pt-2 grid grid-cols-1 gap-8 mx-12">
                  <div className={InputOuterDiv}>
                    <div className={InputInnerDiv}>
                      <Field
                        type="text"
                        name="company"
                        className={InputFieldClasses}
                        placeholder=" "
                      />
                      <ErrorMessage
                        name="company"
                        component="div"
                        className="top-0 left-0 text-red-600 text-xs"
                      />
                      <label className={InputLabel}>Company</label>
                    </div>
                  </div>
                  <div className={InputOuterDiv}>
                    <div className={InputInnerDiv}>
                      <Field
                        type="text"
                        name="position"
                        className={InputFieldClasses}
                        placeholder=" "
                      />
                      <ErrorMessage
                        name="position"
                        component="div"
                        className="top-0 left-0 text-red-600 text-xs"
                      />
                      <label className={InputLabel}>Position</label>
                    </div>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};
export default EducationModal;
