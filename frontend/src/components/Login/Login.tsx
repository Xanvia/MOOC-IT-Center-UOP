"use client";
import React, { useState } from "react";
import GoogleButton from "./GoogleButton";
import SecondaryButton from "../Buttons/SecondaryButton";

export default function Login() {
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
      <SecondaryButton onClick={toggleModal} text="Login" />

      {isOpen && (
        <div
          id="authentication-modal"
          aria-hidden="true"
          className="fixed inset-0 flex items-center justify-center h-full w-full bg-black bg-opacity-50 pt-5"
        >
          <div className="relative bg-white rounded-lg shadow-2xl w-[450px] h-[720px] px-16 pt-4">
            
            <div className="text-3xl font-bold text-[#072569] text-center mt-5 mb-2.5 mx-0">
              Welcome Back!
              
            </div>

            <form action="#">
              <div>
                <div className="w-full h-[35px] mt-[25px]">
                  <input
                    className="h-full w-full text-xs border pl-[15px] rounded-[5px] border-solid border-[#072569]"
                    type="text"
                    placeholder="Enter Your Email"
                    required
                  />
                </div>

                <div className="w-full h-[35px] mt-[25px]">
                  <input
                    className="h-full w-full text-xs border pl-[15px] rounded-[5px] border-solid border-[#072569]"
                    type="password"
                    placeholder="Enter Your Password"
                    required
                  />
                </div>

                <div className="w-full h-[35px] mt-[25px] ">
                  <input
                    className="h-full w-full text-[15px] text-white cursor-pointer transition-all duration-[0.3s] ease-[ease] rounded-[5px] hover:tracking-[1px] bg-[#072569] hover:bg-[#2563eb]"
                    type="submit"
                    value="Login"
                  />
                </div>
              </div>
            </form>
            <div className="google">
              <a
                className="block w-full h-[35px] text-xs no-underline text-center text-white leading-[35px] mt-5 mb-[15px] mx-0 pl-5 rounded-[5px] bg-[#072569] "
                href="#"
              >
                <i className="fa-brands fa-google text-xs pr-3"></i>Login with
                Google
              </a>
            </div>
            <div className="text-xs justify-center flex mt-[25px] mb-5 mx-0">
              <div className="text-[#072569] no-underline pl-0 pr-[5px] py-0">
                Dont have an account?
              </div>
              <a
                className="text-[#072569] font-bold no-underline pl-[5px] pr-0 py-0"
                href="#"
              >
                Register
              </a>
            </div>
          </div>
          <button
                type="button"
                className="absolute top-0 right-0end-2.5 text-gray-400  bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
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
      )}
    </>
  );
}