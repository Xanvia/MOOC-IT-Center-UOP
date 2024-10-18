"use client";
import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { format } from "date-fns";
import { toast } from "sonner";
import CreateButton from "@/components/Buttons/CreateButton";
import EditButton from "@/components/Buttons/EditButton";
import MonthPicker from "../MonthPicker";
import CloseButton from "@/components/Buttons/CloseButton";
import SolidButton from "@/components/Buttons/SolidButton";
import DeleteButton from "@/components/Buttons/DeleteButton";
import DropDownInstitution from "@/components/DropDown/DropDownUni";
import {
  InputFieldClasses,
  InputLabel,
  InputInnerDiv,
  InputOuterDiv,
  ModalClassesBG,
  XpCardModalClasses,
} from "@/components/components.styles";
import { Education } from "../types";
import {
  addEducationData,
  deleteEducationData,
  editEducationData,
} from "@/services/user.service";

interface Props {
  CardTitle: string;
  eduData?: Education;
  reloadData: () => void;
}

interface FormData {
  degree: string;
  field_of_study: string;
  startDate: Date | null;
  endDate: Date | null;
}

const validationSchema = Yup.object({
  degree: Yup.string().required("Required"),
  field_of_study: Yup.string().required("Required"),
  startDate: Yup.date().required("Start date is required").nullable(),
  endDate: Yup.date()
    .nullable()
    .test("endDate", "End date cannot be before start date", function (value) {
      const { startDate } = this.parent;
      return !value || value >= startDate; // If no end date is selected or end date is >= start date, validation passes
    }),
});

const EducationModal: React.FC<Props> = ({
  CardTitle,
  eduData,
  reloadData,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [institution, setInstitution] = useState(eduData?.institution || "");
  const [startDate, setStartDate] = useState<Date | null>(
    eduData?.start_date ? new Date(eduData.start_date) : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    eduData?.end_date ? new Date(eduData.end_date) : null
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
      return;
    }
    try {
      const data = {
        ...values,
        institution,
        start_date: values.startDate ? format(values.startDate, "yyyy-MM") : null,
        end_date: values.endDate ? format(values.endDate, "yyyy-MM") : null,
      };
      let response;
      if (eduData) {
        response = await editEducationData(eduData.id, data);
        toast.success(response.message);
      } else {
        response = await addEducationData(data);
        toast.success(response.message);
      }
      reloadData();
      setIsOpen(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      if (eduData) {
        const response = await deleteEducationData(eduData.id);
        toast.success("Education Entry Deleted");
        reloadData();
        setIsOpen(false);
      }
    } catch (error: any) {
      toast.error(error.message);
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
                field_of_study: eduData?.field_of_study || "",
                startDate: startDate,
                endDate: endDate,
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue }) => (
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
                          name="field_of_study"
                          className={InputFieldClasses}
                          placeholder=" "
                        />
                        <ErrorMessage
                          name="field_of_study"
                          component="div"
                          className="top-0 left-0 text-red-600 text-xs"
                        />
                        <label className={InputLabel}>Field Of Study</label>
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
                        <label className={InputLabel}>Degree</label>
                      </div>
                    </div>
                    <div className={InputOuterDiv}>
                      <div className={InputInnerDiv}>
                        <span className="text-sm font-medium text-gray-400">
                          From
                        </span>
                        <MonthPicker
                          setDate={(date) => {
                            setStartDate(date);
                            setFieldValue("startDate", date);
                          }}
                          initialDate={eduData ? startDate : null}
                          text="Start Date"
                        />
                        <ErrorMessage
                          name="startDate"
                          component="div"
                          className="text-red-600 text-xs"
                        />
                      </div>
                    </div>
                    <div className={InputOuterDiv}>
                      <div className={InputInnerDiv}>
                        <span className="text-sm font-medium text-gray-400">
                          To
                        </span>
                        <MonthPicker
                          setDate={(date) => {
                            setEndDate(date);
                            setFieldValue("endDate", date);
                          }}
                          initialDate={endDate}
                          text="End Date"
                        />
                        <ErrorMessage
                          name="endDate"
                          component="div"
                          className="text-red-600 text-xs"
                        />
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
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};

export default EducationModal;