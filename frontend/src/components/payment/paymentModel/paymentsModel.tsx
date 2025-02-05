import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import axiosInstance from "@/lib/axiosInstance";
import { enrollCourse } from "@/services/course.service";

declare global {
  interface Window {
    errorCallback: (error: any) => void;
    cancelCallback: () => void;
    successCallback: (response: any) => void;
    Checkout: any;
  }
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  provider: string;
  description: string;
  fee: number;
  trialAvailable: boolean;
  courseId: number;
}

export default function PaymentModal({
  isOpen,
  onClose,
  title,
  provider,
  fee,
  trialAvailable,
  courseId,
}: PaymentModalProps) {
  const router = useRouter();
  const params = useParams();
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [enrollementId, setEnrollementId] = useState<number | null>(null);

  const handleStartFreeTrial = () => {
    const courseId = params.courseId;
    router.push(`/courses/${courseId}`);
  };

  const initiatePayment = async () => {
    const res = await enrollCourse(courseId);
    setEnrollementId(res.data.id);
    console.log(res.data.id);
    handlePayment(res.data.id);
  };

  const handlePayment = async (id: number) => {
    const token = await recaptchaRef.current?.executeAsync();
    setRecaptchaToken(token!);

    if (!token) {
      alert("You Failed the ReCAPTCHA");
      return;
    }

    try {
      console.log("Initiating payment...");
      const response = await axiosInstance.post(
        `/payments/${id}/initiate-payment/`,
        {
          recaptchaToken: token,
        }
      );

      const { sessionId, responseParams, version } = response.data;
      setSessionId(sessionId);

      const Checkout = window.Checkout;

      if (sessionId && Checkout) {
        Checkout.configure({
          session: {
            id: sessionId,
            version: version,
          },
        });
        Checkout.showPaymentPage();
      } else {
        console.error("Checkout library not loaded.");
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert("Failed to initiate payment. Please try again.");
    }
  };

  useEffect(() => {
    window.errorCallback = (error: any) => {
      console.error("An error occurred during the payment process.");
      alert("Payment failed. Please try again.");
    };

    window.cancelCallback = () => {
      console.log("The user canceled the payment.");
    };

    window.successCallback = async (response: any) => {
      try {
        const { paymentId, sessionId } = response;
        const verifyResponse = await axiosInstance.post("/payment/verify", {
          paymentId,
          sessionId,
        });

        console.log("Payment verified:", verifyResponse.data);
        alert("Payment successful. You can now access the course.");
        onClose();
        const courseId = params.courseId;
        router.push(`/courses/${courseId}`);
      } catch (error) {
        console.error("Error verifying payment:", error);
        alert("Failed to verify payment. Please try again.");
      }
    };
  }, [onClose, params.courseId, router]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://bankofceylon.gateway.mastercard.com/static/checkout/checkout.min.js";
    script.setAttribute("data-error", "errorCallback");
    script.setAttribute("data-cancel", "cancelCallback");
    script.setAttribute("data-complete", "successCallback");
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-500 mt-1">
            Offered by <span className="font-semibold">{provider}</span>
          </p>
        </div>

        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-md mb-6">
          <div>
            <p className="text-gray-600 text-sm">Course Fee:</p>
            <p className="text-lg font-semibold text-blue-900">
              {fee === null ? "Free" : `${fee} USD`}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Full Access:</p>
            <p className="text-green-600 text-xl">✔️</p>
          </div>
        </div>

        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey={process.env.NEXT_PUBLIC_SITE_KEY!}
          onChange={(token) => setRecaptchaToken(token)}
          onExpired={() => setRecaptchaToken("")}
        />

        {trialAvailable ? (
          <button
            onClick={handleStartFreeTrial}
            className="w-full bg-blue-800 text-white px-6 py-3 rounded-md hover:bg-blue-900"
          >
            Start Free Trial
          </button>
        ) : (
          <button
            onClick={initiatePayment}
            className="w-full bg-blue-800 text-white px-6 py-3 rounded-md hover:bg-blue-900"
          >
            Proceed to Payment
          </button>
        )}
      </div>
    </div>
  );
}
