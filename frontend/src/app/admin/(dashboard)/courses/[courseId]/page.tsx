"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import PaymentTable from "@/components/Payments/PaymentTable";
import { useParams } from "next/navigation";
import { getPayments } from "@/services/settings.service";

interface PaymentData {
  id: string;
  student: string;
  course: string;
  date: string;
  amount: number;
}

const PaymentsPage = () => {
  const [paymentsData, setPaymentsData] = useState<PaymentData[]>([]);
  const params = useParams();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        // Replace this with your actual API call
        const payments = await getPayments(params.courseId as string);
        setPaymentsData(payments);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPayments();
  }, [params.courseId]);

  return (
    <div className="flex h-screen bg-gray-50">
      <Head>
        <title>OpenEd - Payment Management</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-1 flex flex-col overflow-hidden p-6 bg-white rounded-lg shadow-md mx-6 my-6">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Payment History
          </h2>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search student name..."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <PaymentTable data={paymentsData} />
      </main>
    </div>
  );
};

export default PaymentsPage;