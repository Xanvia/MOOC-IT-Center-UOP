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
import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "@/utils/constants";
import { format } from "date-fns";
import DropDownInstitution from "@/components/DropDown/DropDownUni";
import Cookies from "js-cookie";

interface Props {
  CardTitle: string;
  eduData?: Education;
  realoadData: () => void;
}

interface FormData {
  degree: string;
}

const EducationModal: React.FC<Props> = ({
  CardTitle,
  eduData,
  realoadData,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const token = Cookies.get("token");

  const [institution, setInstitution] = useState(eduData?.institution || "Select Your Institution");
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
  };

  const handleSubmit = async (values: FormData) => {
    if (institution === "") {
      toast.warning("Please select an institution");
    }
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const data = {
        ...values,
        institution: institution,
        start_date: startDate ? format(startDate, "yyyy-MM") : null,
        end_date: endDate ? format(endDate, "yyyy-MM") : null,
      };
      let response;
      if (eduData) {
        response = await axios.put(
          `${API_URL}/user/education/${eduData?.id}/`,
          data,
          { headers }
        );
      } else {
        response = await axios.post(`${API_URL}/user/education/`, data, {
          headers,
        });
      }
      toast.success(response.data.message);
      realoadData();
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.delete(
        `${API_URL}/user/education/${eduData?.id}/`,
        { headers }
      );
      toast.success("Education Details Deleted");
      realoadData();
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {eduData ? (
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
                degree: eduData?.degree || "",
              }}
              validationSchema={Yup.object({
                degree: Yup.string().required("Required"),
              })}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="pt-6 grid grid-cols-1 gap-6 mx-12">
                  <DropDownInstitution
                    label="Your Institution"
                    addSelection={setInstitution}
                    selectedInstitution={institution as string}
                  />
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
                        initialDate={eduData ? startDate : null}
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
                          initialDate={eduData ? endDate : null}
                          text="End Date"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`pl-[70px] pt-10 ${eduData ? "mb-8" : "mb-12"}`}
                >
                  <SolidButton
                    type="submit"
                    text="S U B M I T"
                    onClick={() => {}}
                  />
                </div>
                {eduData && (
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
