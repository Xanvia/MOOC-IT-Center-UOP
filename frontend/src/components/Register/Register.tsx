"use client";
import React, { useState } from "react";
import PrimaryButton from "../Buttons/PrimaryButton";
import RegisterForm from "../RegisterForm/RegisterForm";
import RegistrationFormTwo from "../RegisterForm/RegisterFormTwo";
import CloseButton from "../Buttons/CloseButton";
import {
  ModalClassesBG,
  RegisterModalClasses,
  RegisterBlueDiv,
  RegisterWhiteDiv,
} from "../components.styles";

export default function Register() {
  const [isOpen, setIsOpen] = useState(false);
  const [resetForm, setResetForm] = useState<(() => void) | null>(null);
  const [step, setStep] = useState("Two");

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
              {step == "One" && (
                <>
                  <h1 className="ps-5 py-1 lg:py-4 text-3xl text-primary font-bold mb-4">
                    Take the First Step!
                  </h1>
                  <center>
                    <RegisterForm
                      setStep={setStep}
                      setResetForm={() => setResetForm(null)}
                    />
                  </center>
                </>
              )}
              {step == "Two" && (
                <>
                  <h1 className="ps-5 py-1 lg:py-4 text-3xl text-primary font-bold mb-4">
                    Almost There!
                  </h1>
                  <center>
                    <RegistrationFormTwo />
                  </center>

                  <br />
                </>
              )}

              <CloseButton onClick={toggleModal} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
