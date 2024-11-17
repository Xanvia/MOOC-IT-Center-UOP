"use client";
import React, { useState } from "react";
import Image from "next/image";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import CourseDescEditModal from "./CourseDescEditModal";
import { CourseData } from "../course.types";
import { enrollCourse, initiatePaymentBe } from "@/services/course.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useGlobal } from "@/contexts/store";
import PaymentModal from "@/components/payment/paymentModel/paymentsModel";
import { set } from "jodit/types/core/helpers";

interface CourseHeaderProps {
  courseData: CourseData;
  reloadData: () => void;
  isEdit: boolean;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({
  courseData,
  reloadData,
  isEdit,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [enrollementId, setEnrollementId] = useState<number | null>(null);

  const handleEnroll = async () => {
    try {
      setModalOpen(true);
      const enrollementId = await enrollCourse(courseData.id);
      setEnrollementId(1);
      toast.success("Enrolled in course successfully");
    } catch (error: any) {
      toast.error("Error enrolling in course");
    }
  };

  const router = useRouter();
  const { userRole } = useGlobal();

  async function initiatePayment(enrollmentId: number) {
    try {
      // Fetch the payload from your backend
      const response = await initiatePaymentBe(enrollmentId);
      const payload = response.data.payload;
      console.log(payload);
      // Create a form and submit it to the PayHere API
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://sandbox.payhere.lk/pay/checkout";

      for (const [key, value] of Object.entries(payload)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value as string;
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  }

  return (
    <>
      <div className="bg-gradient-to-tl from-gray-600 to-gray-800 h-96 w-full relative">
        <div className="mt-8">
          <Image
            src={courseData.header_image || ""}
            alt="Computer"
            layout="fil"
            width={2000}
            height={500}
            className="w-full h-full object-cover absolute mix-blend-overlay"
            priority
          />
        </div>
        <div className="lg:p-24 sm:p-20 p-10 pb-10 lg:pb-8 sm:pb-8">
          <div className="grid grid-cols-1 md:grid-flow-col gap-6 sm:gap-10 md:gap-24 sm:mx-16 min-h-[150px]">
            <div>
              <h1 className="text-white text-2xl sm:text-4xl md:text-4xl lg:text-5xl font-bold whit">
                {courseData.name}
              </h1>
              <h2 className="text-white sm:text-1xl lg:text-xl">
                Offered by {courseData.institution}
              </h2>
            </div>
            <div>
              <h2 className="text-white space-y-6 text-base sm:text-xl lg:text-2xl font-semibold ">
                {courseData.course_creator.full_name}
              </h2>
              <h2 className="text-white space-y-6 text-sm">
                {courseData.course_creator.headline}
              </h2>
            </div>
          </div>
          <div className="relative flex justify-between items-center sm:mt-10 md:mt-14 sm:ml-20 ml-2">
            {isEdit && (
              <CourseDescEditModal
                courseData={courseData}
                reloadData={reloadData}
              />
            )}

            {isEdit || userRole == "admin" ? (
              <PrimaryButton
                text="C L A S S R O O M"
                onClick={() => router.push(`/courses/${courseData.id}/room`)}
              />
            ) : (
              <>
                {courseData.isEnrolled ? (
                  <PrimaryButton
                    text="R E S U M E"
                    onClick={() =>
                      router.push(`/courses/${courseData.id}/room`)
                    }
                    // onClick={() => initiatePayment(2)}
                  />
                ) : (
                  <PrimaryButton text="E N R O L" onClick={handleEnroll} />
                )}
              </>
            )}
          </div>
        </div>
        <PaymentModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          title={courseData.name}
          provider={courseData.institution}
          description={courseData.description}
          fee={courseData.price}
          trialAvailable={false}
          onClick={() => initiatePayment(2)}
        />
      </div>
    </>
  );
};

export default CourseHeader;
