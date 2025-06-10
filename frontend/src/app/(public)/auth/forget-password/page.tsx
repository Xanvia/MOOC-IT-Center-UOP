"use client";
import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { requestPasswordReset, resetPassword } from "@/services/auth.service";
import { toast } from "sonner";

const ForgetPasswordPage: React.FC = () => {
  const [otpRequested, setOtpRequested] = useState(true);

  const handleRequestOtp = async (email: string) => {
    try {
      await requestPasswordReset(email);
      toast.success("OTP sent to your email.");
      setOtpRequested(true);
    } catch (error: any) {
      toast.error(error.message || "Failed to send OTP.");
    }
  };

  const handleResetPassword = async (values: { otp: string; newPassword: string; confirmPassword: string }) => {
    try {
      await resetPassword(values.otp, values.newPassword);
      toast.success("Password reset successfully.");
    } catch (error: any) {
      toast.error(error.message || "Password reset failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Forget Password</h2>

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
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <ErrorMessage name="email" component="div" className="text-sm text-red-600 mt-1" />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-700 transition"
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
              newPassword: Yup.string()
                .required("New password is required")
                .matches(
                  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  "Password must be at least 8 characters long, include one uppercase letter, one number, and one special character"
                ),
              confirmPassword: Yup.string()
                .oneOf([Yup.ref("newPassword")], "Passwords must match")
                .required("Confirm password is required"),
            })}
            onSubmit={handleResetPassword}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                    OTP
                  </label>
                  <Field
                    type="text"
                    name="otp"
                    id="otp"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <ErrorMessage name="otp" component="div" className="text-sm text-red-600 mt-1" />
                </div>

                <div className="mb-4">
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <Field
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <ErrorMessage name="newPassword" component="div" className="text-sm text-red-600 mt-1" />
                </div>

                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-sm text-red-600 mt-1" />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-700 transition"
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