"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SolidButton from "../../Buttons/SolidButton";
import GoogleIcon from "@/icons/GoogleIcon";
import SvgButton from "../../Buttons/SvgButton";
import DropDown from "@/components/DropDown/DropDown";
import { getGoogleCode } from "@/utils/GoogleAuth";
import { toast } from "sonner";
import {
  InputFieldClasses,
  InputLabel,
  InputInnerDiv,
  InputOuterDiv,
} from "../../components.styles";
import { registerUser, registerWithGoogle } from "@/services/auth.service";
import Cookies from "js-cookie";
import { useGlobal } from "@/contexts/store";

export interface RegistrationFormValues {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  userRole: string;
}

const initialValues: RegistrationFormValues = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  userRole: "",
};

const passwordSchema = Yup.string()
  .required("This field is required")
  .matches(/[A-Z]/, "Must contain at least one uppercase letter")
  .matches(/[0-9]/, "Must contain at least one digit")
  .matches(
    /[!@#$%^&*(),.?":{}|<>]/,
    "Must contain at least one special character"
  )
  .min(8, "Must be at least 8 characters long");

const validationSchema = Yup.object({
  firstName: Yup.string().required("This field is required"),
  lastName: Yup.string().required("This field is required"),
  username: Yup.string().required("This field is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("This field is required"),
  password: passwordSchema,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("This field is required"),
});

interface RegisterFormProps {
  setStep: (step: string) => void;
  setResetForm: () => void;
}

const RegistrationForm: React.FC<RegisterFormProps> = ({
  setStep,
  setResetForm,
}) => {
  const { setIsLoggedIn, setUserRole } = useGlobal();

  const handleSubmit = async (values: RegistrationFormValues) => {
    setResetForm();
    try {
      const res = await registerUser(values);
      Cookies.set("token", res.data.access_token);
      Cookies.set("user", JSON.stringify(res.data.user));
      setUserRole(res.data.user.userRole);
      setStep("Two");
      toast.success(res.message);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleGoogleRegister = async (userRole: string) => {
    try {
      if (!userRole) {
        toast.warning("Please select user type");
        return;
      }
      const code = await getGoogleCode();
      if (code !== null) {
        const res = await registerWithGoogle(code, userRole);
        Cookies.set("token", res.data.access_token);
        Cookies.set("user", JSON.stringify(res.data.user));
        setUserRole(res.data.user.userRole);
        setStep("Two");
        toast.success(res.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
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
          <div className="pt-8">
            <SolidButton
              type="submit"
              text="R E G I S T E R"
              onClick={() => {}}
            />
          </div>

          <br />
          <div className="text-gray-500 peer-focus:text-gray-500 py-2">
            <p> -or- </p>
          </div>
          <SvgButton
            text="Continue with google"
            onClick={() => handleGoogleRegister(values.userRole)}
            svg={<GoogleIcon />}
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
