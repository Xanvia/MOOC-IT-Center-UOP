"use client";
import React, { useState } from "react";
import PrimaryButton from "../Buttons/PrimaryButton";
import Dropdown from "../DropDown/DropDown";
import DropDownCountry from "../DropDown/DropDownCountry";
import DropDownGender from "../DropDown/DropDownGender";
import DatePicker from "../DropDown/DatePicker";
import RegisterForm from "../RegisterForm/RegisterForm";
<<<<<<< HEAD
import { FormikHelpers } from "formik";
=======
import RegisterFormTwo from "../RegisterForm/RegisterFormTwo";
>>>>>>> 8311c0f (new component regformTwo)
import CloseButton from "../Buttons/CloseButton";
import axios from "axios";
import { API_URL, redirect_uri, CALLBACK_URL } from "@/utils/constants";
import {
  ModalClassesBG,
  RegisterModalClasses,
  RegisterBlueDiv,
  RegisterWhiteDiv,
} from "../components.styles";
import { getGoogleCode } from "@/utils/GoogleAuth";
import Cookies from "js-cookie";
import { toast } from "sonner";

export interface RegistrationFormValues {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  userRole: string;
}

export default function Register() {
  const [isOpen, setIsOpen] = useState(false);
  const [resetForm, setResetForm] = useState<(() => void) | null>(null);
  const [step, setStep] = useState(1);

   const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleInsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsOpen(false);
    if (resetForm) {
      resetForm();
    }
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (
    values: RegistrationFormValues,
    formikHelpers: FormikHelpers<RegistrationFormValues>
  ) => {
    // console.log("Form values:", values);
    setResetForm(() => formikHelpers.resetForm);
    if (!values.userRole) {
      toast.warning("Please select user uype");
    } else {
      axios
        .post(`${API_URL}/user/register/`, {
          firstname: values.firstName,
          lastname: values.lastName,
          username: values.username,
          email: values.email,
          password: values.password,
          user_type: values.userRole,
        })
        .then((res) => {
          Cookies.set("token", res.data.data.access_token);
          console.log(res.data.user);
          Cookies.set("user", JSON.stringify(res.data.data.user));
          setStep(2);
          toast.success(res.data.message);
        })
        .catch((err) => {
          const errorMessage = err.response?.data.message ?? "Network error";
          toast.error(errorMessage);
        });
    }
  };

  const handleGoogleLogin = async (userRole: String) => {
    if (!userRole) {
      toast.warning("Please select user type");
    } else {
      const code = await getGoogleCode();
      if (code !== null) {
        axios
          .post(`${API_URL}/user/google-auth/`, {
            code: code,
            user_type: userRole,
            redirect_uri: CALLBACK_URL,
          })
          .then((res) => {
            Cookies.set("token", res.data.data.access_token);
            console.log(res.data.user);
            Cookies.set("user", JSON.stringify(res.data.data.user));
            setStep(2);
            toast.success(res.data.message);
            window.location.reload();
          })
          .catch((err) => {
            const errorMessage = err.response?.data.message ?? "Network error";
            toast.error(errorMessage);
          });
      }
    }
  };

  return (
    <>
      <PrimaryButton onClick={toggleModal} text="Register" />
      {isOpen && (
        <div
          id="authentication-modal"
          aria-hidden="true"
          className={ModalClassesBG}
          onMouseDown={handleInsideClick}
        >
          <div
            onMouseDown={handleOutsideClick}
            className={RegisterModalClasses}
          >
            <div className="hidden md:flex relative basis-4/12">
              <div className={RegisterBlueDiv}>
                <div className="">
                  <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                    OpenEd
                  </h1>
                  <span className="font-sans text-base xl:text-xl ">
                    {`"Empower your journey. Learn, grow, succeed with us."`}
                  </span>
                </div>
              </div>
            </div>
            <div className={RegisterWhiteDiv}>
              <h1 className="ps-5 py-1 lg:py-4 text-2xl text-primary font-bold mb-4">
                Take the First Step!
              </h1>

              <center>
                <RegisterForm
                  onSubmit={handleSubmit}
                  onGoogleClick={handleGoogleLogin}
                />
              </center>

              <CloseButton onClick={toggleModal} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
