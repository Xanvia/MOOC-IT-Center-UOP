"use client";
import React, { useState } from "react";
import SecondaryButton from "../Buttons/SecondaryButton";
import SolidButton from "../Buttons/SolidButton";
import SvgButton from "../Buttons/SvgButton";
import GoogleIcon from "@/icons/GoogleIcon";
import { openGoogleLoginPage } from "@/utils/GoogleAuth";
import CloseButton from "../Buttons/CloseButton";

import {
  ModalClassesBG,
  LoginModalClasses,
  InputFieldClasses,
  InputLabel,
  InputInnerDiv,
  InputOuterDiv,
} from "../components.styles";

export default function Login() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleInsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsOpen(false);
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <>
      <SecondaryButton onClick={toggleModal} text="Login" />

      {isOpen && (
        <div
          id="authentication-modal"
          aria-hidden="true"
          className={`${ModalClassesBG} pt-5`}
          onMouseDown={handleInsideClick}
        >
          <div onMouseDown={handleOutsideClick} className={LoginModalClasses}>
            <CloseButton onClick={toggleModal} />
            <div className="text-3xl font-bold text-[#072569] text-center mt-10 mb-2.5 mx-0">
              Welcome Back!
            </div>

            <form action="#">
              <div className="pt-16 grid grid-cols-1 gap-8">
                <div className={InputOuterDiv}>
                  <div className={InputInnerDiv}>
                    <input className={InputFieldClasses} placeholder=" " />
                    <label className={InputLabel}>Email</label>
                  </div>
                </div>
                <div className={InputOuterDiv}>
                  <div className={InputInnerDiv}>
                    <input className={InputFieldClasses} placeholder=" " />
                    <label className={InputLabel}>Password</label>
                  </div>
                </div>
              </div>
            </form>

            <div className="pt-16 sm:px-8 flex flex-col items-center justify-center">
              <SolidButton text="R E G I S T E R" onClick={() => {}} />
              <br />
              <div className="text-gray-500 peer-focus:text-gray-500 py-2 px-28 text-center">
                <p> -or- </p>
              </div>
              <SvgButton
                text="Continue with google"
                onClick={openGoogleLoginPage}
                svg={<GoogleIcon />}
              />
              <br />
              <div className="text-blue-950 pt-16 text-center">
                Already have an account? <u>Login</u>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
