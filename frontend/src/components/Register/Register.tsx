"use client";
import React, { useState } from "react";
import PrimaryButton from "../Buttons/PrimaryButton";
import Dropdown from "../DropDown/DropDown";
import RegisterForm from "../RegisterForm/RegisterForm";
import CloseButton from "../Buttons/CloseButton";

export default function Register() {
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
    // Here you can add your logic for handling the login
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <>
      ,<PrimaryButton onClick={toggleModal} text="Register" />
      {isOpen && (
        <div
          id="authentication-modal"
          aria-hidden="true"
          className="fixed z-10 inset-0 flex items-center justify-center h-full w-full bg-black bg-opacity-50"
          onMouseDown={handleInsideClick}
        >
          <div
            onMouseDown={handleOutsideClick}
            className="flex md:rounded-lg md:shadow-2xl md:w-[1000px] xl:w-[1150px] md:h-[700px] h-full w-full"
          >
            <div className="hidden md:flex relative basis-4/12">
              <div className="bg-primary text-white px-10 py-4 rounded-l-lg absolute inset-0 flex pt-60 px-10 ">
                <div className="">
                  <h1 className="text-4xl lg:text-6xl font-bold mb-4">MOOC</h1>
                  <span className="font-sans text-base xl:text-xl ">
                    {`"Empower your journey. Learn, grow, succeed with us."`}
                  </span>
                </div>
              </div>
            </div>
            <div className="relative w-full h-11/12 bg-white md:rounded-r-lg md:basis-8/12 pt-10 pl-12 pr-10">
              <h1 className="ps-5 py-1 lg:py-4 text-2xl text-primary font-bold mb-4">
                Take the First Step!
              </h1>
              <Dropdown />
              <br />
              <center>
                <RegisterForm />
              </center>

              <CloseButton onClick={toggleModal} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
