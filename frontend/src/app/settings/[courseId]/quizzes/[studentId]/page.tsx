"use client";
import React from "react";
import Head from "next/head";
import QuizSettingsTable from "@/components/QuizTable/QuizSettingsTable";

const QuizzesManagementPage = () => {
  const quizData = [
    { quizName: "Math Quiz", grade: "A", status: "Active" as const },
    { quizName: "Science Quiz", grade: "B", status: "Completed" as const },
    { quizName: "History Quiz", grade: "A+", status: "Inactive" as const },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Head>
        <title>OpenEd - Quizzes Management</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-1 flex flex-col overflow-hidden p-6 bg-white rounded-lg shadow-md mx-6 my-6">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Quizzes</h2>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search name..."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Pass quizData to QuizSettingsTable and an empty function for onManageQuizClick */}
        <QuizSettingsTable data={quizData} onManageQuizClick={() => {}} />
      </main>
    </div>
  );
};

export default QuizzesManagementPage;
