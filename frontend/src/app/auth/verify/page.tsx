"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { verifyEmail } from "@/services/auth.service";

const VerifyEmailPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const verify = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      if (token) {
        try {
          await verifyEmail(token);
          router.push("/success"); // Redirect to success page after verification
        } catch (error) {
          console.error("Verification failed:", error);
          router.push("/error"); // Redirect to error page if verification fails
        }
      } else {
        router.push("/error"); // Redirect to error page if token is missing
      }
    };

    verify();
  }, [router]);

  return <div>Verifying...</div>;
};

export default VerifyEmailPage;