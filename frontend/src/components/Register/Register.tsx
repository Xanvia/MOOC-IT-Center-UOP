"use client";
import React, { useState, useEffect } from "react";
import PrimaryButton from "../Buttons/PrimaryButton";
import RegisterForm from "./RegisterForm/RegisterForm";
import RegistrationFormTwo from "./RegisterForm/RegisterFormTwo";
import CloseButton from "../Buttons/CloseButton";
import {
  ModalClassesBG,
  RegisterModalClasses,
  RegisterBlueDiv,
  RegisterWhiteDiv,
} from "../components.styles";
import Image from "next/image";
import Link from "next/link";

export default function Register() {
  const [isOpen, setIsOpen] = useState(false);
  const [resetForm, setResetForm] = useState<(() => void) | null>(null);
  const [step, setStep] = useState("One");

  const handleOverlayClick = () => {
    setIsOpen(false);
    if (resetForm) resetForm();
  };

  const handleInnerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // prevent closing when clicking inside modal
  };

  const toggleModal = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      setStep("One");
    }
  };

  // ✅ Event listeners for open/close from outside (Login link inside RegisterForm)
  useEffect(() => {
    const handleClose = () => {
      setIsOpen(false);
      if (resetForm) resetForm();
    };

    const handleOpen = () => {
      setIsOpen(true);
      setStep("One");
    };

    window.addEventListener("closeRegisterModal", handleClose);
    window.addEventListener("openRegisterModal", handleOpen);

    return () => {
      window.removeEventListener("closeRegisterModal", handleClose);
      window.removeEventListener("openRegisterModal", handleOpen);
    };
  }, [resetForm]);

  return (
    <>
      <PrimaryButton onClick={toggleModal} text="Register" />

      {isOpen && (
        <div
          id="authentication-modal"
          aria-hidden="true"
          className={`${ModalClassesBG} z-40`}
          onMouseDown={handleOverlayClick}
        >
          <div
            onMouseDown={handleInnerClick}
            className={RegisterModalClasses}
          >
            {/* Blue side with logo */}
            <div className="hidden md:flex relative basis-4/12">
              <div className={RegisterBlueDiv}>
                <div className="flex flex-col items-center space-y-0">
                  <Link href={"/"}>
                    <Image
                      src="/images/white_logo.png"
                      alt="OpenEd Logo"
                      width={400}
                      height={200}
                      className="object-cover object-center"
                    />
                  </Link>
                  <span className="absolute inset-0 flex justify-center items-center text-white text-center font-sans text-base xl:text-xl z-10 px-10 pt-10">
                    {`"Empower your journey. Learn, grow, succeed with us."`}
                  </span>
                </div>
              </div>
            </div>

            {/* White side with form */}
            <div className={RegisterWhiteDiv}>
              {step === "One" && (
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

              {step === "Two" && (
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
