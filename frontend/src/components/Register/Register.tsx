"use client";
import React, { useState } from "react";
import PrimaryButton from "../Buttons/PrimaryButton";

export default function Register() {
  const [isOpen, setIsOpen] = useState(false);

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
          className="fixed inset-0 flex items-center justify-center h-full w-full bg-black bg-opacity-50"
        >
          <div className="flex bg-white rounded-lg shadow-2xl w-3/4 h-5/6">
            <div className="relative basis-4/12">
              <div className="bg-white text-black px-6 py-4 rounded-lg absolute inset-0 flex items-center justify-center ">
                <div>
                  <h1 className="text-3xl font-bold mb-4">MOOC</h1>
                  <span className="font-sans ">
                    {" "}
                    {`"Empower your journey. Learn, grow, succeed with us."`}
                  </span>
                </div>
              </div>
            </div>
            <div className="relative bg-primary rounded-r-lg basis-8/12">
              <button
                type="button"
                className="absolute top-0 right-0 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                data-modal-hide="authentication-modal"
                onClick={toggleModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
