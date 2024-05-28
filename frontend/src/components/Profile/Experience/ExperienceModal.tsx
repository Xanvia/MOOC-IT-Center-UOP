"use client";
import CreateButton from "@/components/Buttons/CreateButton";
import EditButton from "@/components/Buttons/EditButton";
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
import MonthPicker from "../MonthPicker";
import CloseButton from "@/components/Buttons/CloseButton";
import SolidButton from "@/components/Buttons/SolidButton";

interface Props {
  CardTitle: string;
  Action: string;
}

const AddExperienceModal: React.FC<Props> = ({ CardTitle, Action }: Props) => {
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
        <CreateButton onClick={toggleModal} text="Work" />
      )}

      {isOpen && (
        <div
          onMouseDown={handleInsideClick}
          className={`${ModalClassesBG} bg-opacity-10`}
        >
          <div onMouseDown={handleOutsideClick} className={XpCardModalClasses}>
            <CloseButton onClick={toggleModal} />
            <div className="text-xl font-bold text-[#072569] text-center mb-2 mx-0">
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
                <div className="pt-6 grid grid-cols-1 gap-6 mx-12">
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
                  <div className={InputOuterDiv}>
                    <div className={InputInnerDiv}>
                      <span className="text-sm font-medium text-gray-400">
                        From
                      </span>
                      <MonthPicker setDate={() => {}} text="Start Date" />
                    </div>
                  </div>
                  <div className="py-4">
                    <div className={InputOuterDiv}>
                      <div className={InputInnerDiv}>
                        <span className="text-sm font-medium text-gray-400">
                          To
                        </span>
                        <MonthPicker setDate={() => {}} text="End Date" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pl-[70px] pt-12">
                  <SolidButton
                    type="submit"
                    text="S U B M I T"
                    onClick={() => {}}
                  />
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};
export default AddExperienceModal;
