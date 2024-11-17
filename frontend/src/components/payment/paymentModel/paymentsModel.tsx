"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  provider: string;
  description: string;
  fee: number;
  trialAvailable: boolean;
  onClick?: () => void;
}

export default function PaymentModal({
  isOpen,
  onClose,
  title,
  provider,
  description,
  fee,
  trialAvailable,
  onClick,
}: PaymentModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleStartFreeTrial = () => {
    const courseId = "1"; // Replace with dynamic courseId
    router.push(`/courses/${courseId}`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Modal Content */}
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-500 mt-1">
            Offered by <span className="font-semibold">{provider}</span>
          </p>
        </div>

        {/* Course Description */}
        {/* <p className="text-gray-600 mb-6">{description}</p> */}

        {/* Payment Details */}
        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-md mb-6">
          <div>
            <p className="text-gray-600 text-sm">Course Fee:</p>
            <p className="text-lg font-semibold text-blue-900">
              {fee === 0 ? "Free" : ` ${fee} USD`}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Full Access:</p>
            <p className="text-green-600 text-xl">✔️</p>
          </div>
        </div>

        {/* Action Buttons */}
        {trialAvailable ? (
          <button
            onClick={handleStartFreeTrial}
            className="w-full bg-blue-800 text-white px-6 py-3 rounded-md hover:bg-blue-900"
          >
            Start Free Trial
          </button>
        ) : (
          <button
            className="w-full bg-blue-800 text-white px-6 py-3 rounded-md hover:bg-blue-900"
            onClick={onClick}
          >
            Proceed to Payment
          </button>
        )}
      </div>
    </div>
  );
}
