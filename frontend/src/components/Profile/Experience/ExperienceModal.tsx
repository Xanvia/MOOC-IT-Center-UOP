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
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { API_URL } from "@/utils/constants";
import { format } from "date-fns";
import { Work } from "../types";
import { relative } from "path";

const token = Cookies.get("token");

interface Props {
  CardTitle: string;
  Action: string;
  workData?: Work;
  realoadData: () => void;
}

interface FormData {
  company: string;
  position: string;
}

const AddExperienceModal: React.FC<Props> = ({
  CardTitle,
  Action,
  workData,
  realoadData,
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
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const data = {
        ...values,
        start_date: startDate ? format(startDate, "yyyy-MM") : null,
        end_date: endDate ? format(endDate, "yyyy-MM") : null,
      };

      let response;
      if (Action === "Edit") {
        response = await axios.put(
          `${API_URL}/user/work/${workData?.id}/`,
          data,
          { headers }
        );
      } else {
        response = await axios.post(`${API_URL}/user/work/`, data, { headers });
      }
      toast.success(response.data.message);
      realoadData();
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
                        text="Start Date"
                        initialDate={startDate}
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
                          initialDate={endDate}
                        />
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
