"use client";
import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { requestPasswordReset, resetPassword } from "@/services/auth.service";
import { toast } from "sonner";

const ForgetPasswordPage: React.FC = () => {
  const [otpRequested, setOtpRequested] = useState(false);

  const handleRequestOtp = async (email: string) => {
    try {
      await requestPasswordReset(email);
      toast.success("OTP sent to your email.");
      setOtpRequested(true);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleResetPassword = async (values: { otp: string; newPassword: string; confirmPassword: string }) => {
    try {
      await resetPassword(values.otp, values.newPassword);
      toast.success("Password reset successfully.");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Forget Password</h2>

        {!otpRequested ? (
          <Formik
            initialValues={{ email: "" }}
            validationSchema={Yup.object({
              email: Yup.string().email("Invalid email").required("Email is required"),
            })}
            onSubmit={(values) => handleRequestOtp(values.email)}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-600 text-xs" />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark"
                  disabled={isSubmitting}
                >
                  Request OTP
                </button>
              </Form>
            )}
          </Formik>
        ) : (
          <Formik
            initialValues={{ otp: "", newPassword: "", confirmPassword: "" }}
            validationSchema={Yup.object({
              otp: Yup.string().required("OTP is required"),
              newPassword: Yup.string().required("New password is required"),
              confirmPassword: Yup.string()
                .oneOf([Yup.ref("newPassword")], "Passwords must match")
                .required("Confirm password is required"),
            })}
            onSubmit={handleResetPassword}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                    OTP
                  </label>
                  <Field
                    type="text"
                    name="otp"
                    id="otp"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  />
                  <ErrorMessage name="otp" component="div" className="text-red-600 text-xs" />
                </div>

                <div className="mb-4">
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <Field
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  />
                  <ErrorMessage name="newPassword" component="div" className="text-red-600 text-xs" />
                </div>

                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-600 text-xs" />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark"
                  disabled={isSubmitting}
                >
                  Reset Password
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default ForgetPasswordPage;