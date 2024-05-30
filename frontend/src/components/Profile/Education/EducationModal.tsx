"use client";
import CreateButton from "@/components/Buttons/CreateButton";
import React, { useState, useEffect } from "react";
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
import MonthPicker from "../MonthPicker";
import CloseButton from "@/components/Buttons/CloseButton";
import SolidButton from "@/components/Buttons/SolidButton";
import { Education } from "../types";
import DeleteButton from "@/components/Buttons/DeleteButton";
interface Props {
  CardTitle: string;
  Action: string;
  eduData?: Education;
}

const EducationModal: React.FC<Props> = ({
  CardTitle,
  Action,
  eduData,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const [startDate, setStartDate] = useState<Date | null>(
    eduData ? new Date(eduData.start_date) : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    eduData && eduData.end_date ? new Date(eduData.end_date) : null
  );
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleInsideClick = () => {
    setIsOpen(false);
    setStartDate(null);
    setEndDate(null);
  };

  const handleDelete = async () => {};
  const handleSubmit = async (values: FormData) => {};

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
            <CloseButton onClick={toggleModal} />
            <div className="text-xl font-bold text-[#072569] text-center mb-2 mx-0">
              {CardTitle}
            </div>
            <Formik
              initialValues={{
                institution: "",
                degree: "",
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
                        name="institution"
                        className={InputFieldClasses}
                        placeholder=" "
                      />
                      <ErrorMessage
                        name="institution"
                        component="div"
                        className="top-0 left-0 text-red-600 text-xs"
                      />
                      <label className={InputLabel}>Institution</label>
                    </div>
                  </div>
                  <div className={InputOuterDiv}>
                    <div className={InputInnerDiv}>
                      <Field
                        type="text"
                        name="degree"
                        className={InputFieldClasses}
                        placeholder=" "
                      />
                      <ErrorMessage
                        name="degree"
                        component="div"
                        className="top-0 left-0 text-red-600 text-xs"
                      />
                      <label className={InputLabel}>Education Type</label>
                    </div>
                  </div>
                  <div className={InputOuterDiv}>
                    <div className={InputInnerDiv}>
                      <span className="text-sm font-medium text-gray-400">
                        From
                      </span>
                      <MonthPicker
                        setDate={setStartDate}
                        initialDate={Action === "Edit" ? endDate : null}
                        text="Start Date"
                      />
                    </div>
                  </div>
                  <div className="py-4">
                    <div className={InputOuterDiv}>
                      <div className={InputInnerDiv}>
                        <span className="text-sm font-medium text-gray-400">
                          To
                        </span>
                        <MonthPicker
                          setDate={setEndDate}
                          initialDate={Action === "Edit" ? endDate : null}
                          text="End Date"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`pl-[70px] pt-10 ${
                    Action === "Edit" ? "mb-8" : "mb-12"
                  }`}
                >
                  <SolidButton
                    type="submit"
                    text="S U B M I T"
                    onClick={() => {}}
                  />
                </div>
                {Action === "Edit" && (
                  <div className="pl-[70px]  mb-10 ">
                    <DeleteButton text="D E L E T E" onClick={handleDelete} />
                  </div>
                )}
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};
export default EducationModal;
