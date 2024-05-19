"use client";
import React, { useEffect, useState } from "react";
import SecondaryButton from "../Buttons/SecondaryButton";
import SolidButton from "../Buttons/SolidButton";
import SvgButton from "../Buttons/SvgButton";
import GoogleIcon from "@/icons/GoogleIcon";
import { getGoogleCode } from "@/utils/GoogleAuth";
import CloseButton from "../Buttons/CloseButton";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import { API_URL, redirect_uri } from "@/utils/constants";

import {
  ModalClassesBG,
  LoginModalClasses,
  InputFieldClasses,
  InputLabel,
  InputInnerDiv,
  InputOuterDiv,
} from "../components.styles";
import { attachReactRefresh } from "next/dist/build/webpack-config";

export interface LoginFormValues {
  email: string;
  password: string;
}
const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

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

  const handleSubmit = (values: LoginFormValues) => {
    axios
      .post(`${API_URL}/user/login/`, {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        Cookies.set("token", res.data.data.access_token);
        Cookies.set("user", JSON.stringify(res.data.data.user));
        alert("Login Successful");
        toggleModal();
      })
      .catch((err) => {
        console.log(err.response.data);
        alert(err.response.data.message);
      });
  };

  const handleGoogleLogin = async () => {
    const code = await getGoogleCode();
    if (code !== null) {
      axios
        .post(`${API_URL}/user/google-auth/login/`, {
          code: code,
          redirect_uri: redirect_uri,
        })
        .then((res) => {
          Cookies.set("token", res.data.data.access_token);
          console.log(res.data.user);
          Cookies.set("user", JSON.stringify(res.data.data.user));
          alert("Login Successful");
          toggleModal();
        })
        .catch((err) => {
          console.log(err.response.data);
          alert(err.response.data.message);
        });
    }
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

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="pt-16 grid grid-cols-1 gap-8">
                    <div className={InputOuterDiv}>
                      <div className={InputInnerDiv}>
                        <Field
                          type="email"
                          name="email"
                          className={InputFieldClasses}
                          placeholder=" "
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="top-0 left-0 text-red-600 text-xs"
                        />
                        <label className={InputLabel}>Email</label>
                      </div>
                    </div>
                    <div className={InputOuterDiv}>
                      <div className={InputInnerDiv}>
                        <Field
                          type="password"
                          name="password"
                          className={InputFieldClasses}
                          placeholder=" "
                        />
                        <label className={InputLabel}>Password</label>
                      </div>
                    </div>
                  </div>
                  <div className="pt-16 sm:px-8 flex flex-col items-center justify-center">
                    <SolidButton
                      text="LOG IN"
                      onClick={() => {}}
                      type={"submit"}
                    />
                    <br />
                    <div className="text-gray-500 peer-focus:text-gray-500 py-2 px-28 text-center">
                      <p> -or- </p>
                    </div>
                    <SvgButton
                      text="Continue with google"
                      onClick={handleGoogleLogin}
                      svg={<GoogleIcon />}
                      disabled={false}
                    />
                    <br />
                    <div className="text-blue-950 pt-16 text-center">
                      Already have an account? <u>Login</u>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>

            <div className="text-3xl font-bold text-[#072569] text-center mt-10 mb-2.5 mx-0">
              OpenEd
            </div>
          </div>
        </div>
      )}
    </>
  );
}
