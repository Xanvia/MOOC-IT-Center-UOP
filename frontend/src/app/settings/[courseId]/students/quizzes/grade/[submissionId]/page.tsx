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
  const [assignmentData, setAssignmentData] = useState<any>(null); // Using `any` for flexibility
  const [loading, setLoading] = useState(true);
  const assignmentType = searchParams.get("type");

  useEffect(() => {
    const fetchAssignmentData = async () => {
      setLoading(true);
      try {
        if (assignmentType === "Quiz") {
          const quizData = await getQuizSubmissions(params.submissionId as string);
          console.log(quizData);
          setAssignmentData(quizData);
        } else if (assignmentType === "Code") {
          const codeData = await getCodeSubmissions(params.submissionId as string);
          setAssignmentData(codeData);
        }
      } catch (error) {
        console.error("Failed to fetch assignment data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignmentData();
  }, [assignmentType, params.submissionId]);

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen w-full flex items-center justify-center">
        <span>Loading assignment data...</span>
      </div>
    );
  }

  if (!assignmentData) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen w-full flex items-center justify-center">
        <span>Failed to load assignment data.</span>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full">
      <h1 className="text-2xl font-bold mb-6">Assignment Grading</h1>
      {assignmentType === "Quiz" ? (
        <QuizGrader questions={assignmentData.questions} />
      ) : (
        <CodingGrader codingData={assignmentData} />
      )}
    </div>
  );
};

export default GradingPage;
