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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg flex flex-col items-center text-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6" />
        <h2 className="text-xl font-semibold text-gray-800">Verifying your email...</h2>
        <p className="text-sm text-gray-500 mt-2">
          Please wait while we confirm your email address.
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailPage;


// "use client";
// import React, { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { verifyEmail } from "@/services/auth.service";

// const VerifyEmailPage: React.FC = () => {
//   const router = useRouter();

//   useEffect(() => {
//     const verify = async () => {
//       const urlParams = new URLSearchParams(window.location.search);
//       const token = urlParams.get("token");

//       if (token) {
//         try {
//           await verifyEmail(token);
//           router.push("/success"); // Redirect to success page after verification
//         } catch (error) {
//           console.error("Verification failed:", error);
//           router.push("/error"); // Redirect to error page if verification fails
//         }
//       } else {
//         router.push("/error"); // Redirect to error page if token is missing
//       }
//     };

//     verify();
//   }, [router]);

//   return <div>Verifying...</div>;
// };

// export default VerifyEmailPage;