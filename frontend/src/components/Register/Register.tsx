"use client";
import React, { useState } from "react";
import PrimaryButton from "../Buttons/PrimaryButton";
import RegisterForm from "../RegisterForm/RegisterForm";
import { FormikHelpers } from "formik";
import CloseButton from "../Buttons/CloseButton";
import {
  ModalClassesBG,
  RegisterModalClasses,
  RegisterBlueDiv,
  RegisterWhiteDiv,
} from "../components.styles";

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
    console.log("Form values:", values);
    setResetForm(() => formikHelpers.resetForm);
  };
  return (
    <>
      ,<PrimaryButton onClick={toggleModal} text="Register" />
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
              <RegisterForm onSubmit={handleSubmit} />
              </center>

              <CloseButton onClick={toggleModal} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
