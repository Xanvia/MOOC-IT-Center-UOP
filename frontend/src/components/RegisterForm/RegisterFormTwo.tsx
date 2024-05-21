"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SolidButton from "../Buttons/SolidButton";
import DropDownCountry from "../DropDown/DropDownCountry";
import DropDownGender from "../DropDown/DropDownGender";
import DropDownInterests from "../DropDown/DropDownInterests";
import DatePicker from "../DropDown/DatePicker";

import {
  InputFieldClasses,
  InputLabel,
  InputInnerDiv,
  InputOuterDiv,
} from "../components.styles";


interface RegistrationFormValues {
  phonenumber: string;
}

const initialValues: RegistrationFormValues = {
  phonenumber: "",
};

const validationSchema = Yup.object({
  phonenumber: Yup.string().required("This field is required"),
});

const RegistrationFormTwo: React.FC = () => {
  const handleSubmit = (values: RegistrationFormValues) => {
    console.log("Form values:", values);
  };

  return (
    <>
      
      <div className="flex border items-center">
                  <span className="font-normal ml-3 block truncate">
                    Country
                  </span>
                  <DropDownCountry />
                </div>
      <br/>
      
      <div className="flex border items-center">
                  <span className="font-normal ml-3 block truncate">
                    Gender
                  </span>
                  <DropDownGender />
                </div>
      <br />
      <div className="flex border items-center">
                  <span className="font-normal ml-3 block truncate">
                    Date of Birth
                  </span>
                  <DatePicker />
                </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="md:px-5 lg:px-10 md:pt-5 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-2 xl:gap-8">
            <div className={InputOuterDiv}>
              <div className={InputInnerDiv}>
                <Field
                  name="phonenumber"
                  type="text"
                  placeholder=" "
                  className={InputFieldClasses}
                />
                <label className={InputLabel}>Phone number</label>
                <ErrorMessage
                  name="phonenumber"
                  component="div"
                  className="top-0 left-0 text-red-600 text-xs"
                />
              </div>
            </div>
            <div className={InputOuterDiv}>
              <div className={InputInnerDiv}>
                <Field
                  name="Occupation"
                  type="text"
                  placeholder=" "
                  className={InputFieldClasses}
                />
                <label className={InputLabel}>Occupation</label>
              </div>
            </div>
          </div>
          <br/>
          <DropDownInterests />
          <div className="lg:pt-8">
            <SolidButton text="S U B M I T" onClick={() => {}} />
          </div>
        </Form>
      </Formik>
      
    </>
  );
};

export default RegistrationFormTwo;
