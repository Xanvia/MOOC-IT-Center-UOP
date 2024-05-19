"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SolidButton from "../Buttons/SolidButton";
import GoogleIcon from "@/icons/GoogleIcon";
import SvgButton from "../Buttons/SvgButton";
import { openGoogleLoginPage } from "@/utils/GoogleAuth";
import DropDown from "../DropDown/DropDown";
import { RegistrationFormValues } from "../Register/Register";
import { FormikHelpers } from "formik";
import {
  InputFieldClasses,
  InputLabel,
  InputInnerDiv,
  InputOuterDiv,
} from "../components.styles";
import { on } from "events";

const initialValues: RegistrationFormValues = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  userRole: "",
};

const validationSchema = Yup.object({
  firstName: Yup.string().required("This field is required"),
  lastName: Yup.string().required("This field is required"),
  username: Yup.string().required("This field is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("This field is required"),
  password: Yup.string().required("This field is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("This field is required"),
});

interface RegisterFormProps {
  onSubmit: (
    values: RegistrationFormValues,
    formikHelpers: FormikHelpers<RegistrationFormValues>
  ) => void;
}

const RegistrationForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <DropDown setFieldValue={setFieldValue} />
          <br />
          <div className="md:px-5 lg:px-10 md:pt-5 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-2 xl:gap-8">
            <div className={InputOuterDiv}>
              <div className={InputInnerDiv}>
                <Field
                  name="firstName"
                  type="text"
                  placeholder=" "
                  className={InputFieldClasses}
                />
                <label className={InputLabel}>First Name</label>
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="top-0 left-0 text-red-600 text-xs"
                />
              </div>
            </div>

            <div className={InputOuterDiv}>
              <div className={InputInnerDiv}>
                <Field
                  name="lastName"
                  type="text"
                  placeholder=" "
                  className={InputFieldClasses}
                />
                <label className={InputLabel}>Last Name</label>
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-600 text-xs"
                />
              </div>
            </div>
            <div className={InputOuterDiv}>
              <div className={InputInnerDiv}>
                <Field
                  name="username"
                  type="text"
                  placeholder=" "
                  className={InputFieldClasses}
                />
                <label className={InputLabel}>Username</label>
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-600 text-xs"
                />
              </div>
            </div>

            <div className={InputOuterDiv}>
              <div className={InputInnerDiv}>
                <Field
                  name="email"
                  type="email"
                  placeholder=" "
                  className={InputFieldClasses}
                />
                <label className={InputLabel}>Email Address</label>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 text-xs"
                />
              </div>
            </div>

            <div className={InputOuterDiv}>
              <div className={InputInnerDiv}>
                <Field
                  name="password"
                  type="password"
                  placeholder=" "
                  className={InputFieldClasses}
                />
                <label className={InputLabel}>Password</label>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600 text-xs"
                />
              </div>
            </div>

            <div className={InputOuterDiv}>
              <div className={InputInnerDiv}>
                <Field
                  name="confirmPassword"
                  type="password"
                  placeholder=" "
                  className={InputFieldClasses}
                />
                <label className={InputLabel}>Confirm Password</label>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-600 text-xs"
                />
              </div>
            </div>
          </div>
          <div className="lg:pt-8">
            <SolidButton
              text="R E G I S T E R"
              onClick={() => {}}
              disabled={!values.userRole}
            />
          </div>

          <br />
          <div className="text-gray-500 peer-focus:text-gray-500 py-2">
            <p> -or- </p>
          </div>
          <SvgButton
            text="Continue with google"
            onClick={() => openGoogleLoginPage({ userRole: values.userRole })}
            svg={<GoogleIcon />}
            disabled={!values.userRole}
          />
          <br />
          <span className="text-blue-950">
            <br />
            Already have an account? <u>Login</u>
          </span>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
