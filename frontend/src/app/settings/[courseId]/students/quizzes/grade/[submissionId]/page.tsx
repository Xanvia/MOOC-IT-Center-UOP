"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useParams } from "next/navigation";

import CodingGrader from "@/components/Grading/CodeGrader/CodingGrader";
import QuizGrader from "@/components/Grading/QuizGrader/QuizGrader";
import {
  getCodeSubmissions,
  getQuizSubmissions,
} from "@/services/course.service";

const GradingPage: React.FC = () => {
  const searchParams = useSearchParams();
  const params = useParams();
  const [assignmentData, setAssignmentData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const assigmentType = searchParams.get("type");

  useEffect(() => {
    const fetchAssignmentData = async () => {
      setLoading(true);
      try {
        if (assigmentType === "Quiz") {
          const quizData = await getQuizSubmissions(
            params.submissionId as string
          );
          console.log(quizData);
          setAssignmentData(quizData);
        } else if (assigmentType === "Code") {
          const codeData = await getCodeSubmissions(
            params.submissionId as string
          );
          setAssignmentData(codeData);
        }
      } catch (error) {
        console.error("Failed to fetch assignment data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignmentData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen w-full flex justify-center items-center">
        <p className="text-lg text-gray-600">Loading assignment data...</p>
      </div>
    );
  }
  if (!assignmentData) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen w-full flex justify-center items-center">
        <p className="text-lg text-red-600">Failed to load assignment data.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full">
      <h1 className="text-2xl font-bold mb-6">Assignment Grading</h1>
      {assigmentType === "Quiz" ? (
        <QuizGrader quizData={assignmentData} />
      ) : (
        <CodingGrader codingData={assignmentData} />
      )}
    </div>
  );
};

export default GradingPage;
