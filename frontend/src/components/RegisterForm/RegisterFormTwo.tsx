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
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="lg:px-10 md:pt-5 grid grid-cols-2 gap-12">
            <div className={InputOuterDiv}>
              <div className={InputOuterDiv}></div>
              <DropDownCountry />
            </div>
            <div className={InputOuterDiv}>
              <div className={InputOuterDiv}></div>
              <DropDownGender />
            </div>

            <div className={InputOuterDiv}>
              <div className={InputInnerDiv}>
                <DatePicker />
              </div>
            </div>

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
          </div>
          <br />
          <DropDownInterests />

          <div className="grid grid-cols-4 gap-3 px-1 py-2 md:mx-8 mt-14 mb-10">
            <div className="border rounded-2xl text-primary hover:shadow-md">
              Statistics
            </div>
            <div className="border-2 rounded-2xl text-primary hover:shadow-md">
              Electronics
            </div>
            <div className="border-2 rounded-2xl text-primary hover:shadow-md">
              Cyber Security
            </div>
            <div className="border-2 rounded-2xl text-primary hover:shadow-md">
              Real Analysis
            </div>
            <div className="border-2 rounded-2xl text-primary hover:shadow-md">
              Statistics
            </div>
            <div className="border-2 rounded-2xl text-primary hover:shadow-md">
              Electronics
            </div>
            <div className="border-2 rounded-2xl text-primary hover:shadow-md">
              Cyber Security
            </div>
          </div>
          <div className="lg:pt-8">
            <SolidButton text="S U B M I T" onClick={() => {}} />
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default RegistrationFormTwo;
