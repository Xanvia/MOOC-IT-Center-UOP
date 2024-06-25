"use client";
import CreateButton from "@/components/Buttons/CreateButton";
import EditButton from "@/components/Buttons/EditButton";
import React, { useEffect, useState } from "react";
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
import { toast } from "sonner";
import { format } from "date-fns";
import { Work } from "../types";
import DeleteButton from "@/components/Buttons/DeleteButton";
import {
  addWorkData,
  editWorkData,
  deleteWorkData,
} from "@/services/user.service";

interface Props {
  CardTitle: string;
  workData?: Work;
  reloadData: () => void;
}

interface FormData {
  company: string;
  position: string;
}

const AddExperienceModal: React.FC<Props> = ({
  CardTitle,
  workData,
  reloadData,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const [startDate, setStartDate] = useState<Date | null>(
    new Date(workData?.start_date || new Date().toISOString())
  );
  const [endDate, setEndDate] = useState<Date | null>(
    workData?.end_date ? new Date(workData.end_date) : null
  );

  const handleSubmit = async (values: FormData) => {
    try {
      const data = {
        ...values,
        start_date: startDate ? format(startDate, "yyyy-MM") : null,
        end_date: endDate ? format(endDate, "yyyy-MM") : null,
      };
      let response;
      if (workData) {
        response = await editWorkData(workData.id, data);
        toast.success(response.message);
      } else {
        response = await addWorkData(data);
        toast.success(response.message);
      }
      reloadData();
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleInsideClick = () => {
    setIsOpen(false);
  };

  const handleDelete = async () => {
    try {
      if (workData) {
        const response = await deleteWorkData(workData.id);
        toast.success("Work Experience Deleted");
        reloadData();
        setIsOpen(false);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {workData ? (
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
                company: workData?.company || "",
                position: workData?.position || "",
              }}
              validationSchema={Yup.object({
                company: Yup.string().required("Required"),
                position: Yup.string().required("Required"),
              })}
              onSubmit={handleSubmit}
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
                      <MonthPicker
                        setDate={setStartDate}
                        initialDate={workData ? startDate : null}
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
                          text="End Date"
                          initialDate={workData ? endDate : null}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`pl-[70px] pt-10 ${workData ? "mb-8" : "mb-12"}`}
                >
                  <SolidButton
                    type="submit"
                    text="S U B M I T"
                    onClick={() => {}}
                  />
                </div>
                {workData && (
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
export default AddExperienceModal;
