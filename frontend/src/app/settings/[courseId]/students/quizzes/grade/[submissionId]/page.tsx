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
          const quizData = await getQuizSubmissions(
            params.submissionId as string
          );
          setAssignmentData(quizData);
        } else if (assignmentType === "Code") {
          const codeData = await getCodeSubmissions(
            params.submissionId as string
          );

          const mappedData = {
            question: codeData.question, // Mapping 'code' to 'question' field
            studentCode: codeData.code, // Assuming the student's code is also stored here
            graded : codeData.graded,
            testCases: codeData.test_results.map((testResult: any) => ({
              stdin: testResult.stdin,
              expected_output: testResult.expected_output,
              actual_output: testResult.actual_output,
              passed: testResult.passed,
            })),
            autoGrade: parseFloat(codeData.grade), // Map grade as a number
          };
          console.log(mappedData);
          setAssignmentData(mappedData);
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
      <button
        onClick={() => window.history.back()}
        className="mb-4 px-4 py-2 bg-primary text-white rounded hover:bg-secondary"
      >
        Go Back
      </button>

      <h1 className="text-2xl font-bold mb-6">Assignment Grading</h1>
      {assignmentType === "Quiz" ? (
        <QuizGrader
          questions={assignmentData.questions}
          grade={assignmentData.score}
          gradedI={assignmentData.graded}
          approvedI={assignmentData.grade_approved}
          courseId={
            Array.isArray(params.courseId)
              ? params.courseId[0]
              : params.courseId
          }
        />
      ) : (
        <CodingGrader
          codingData={assignmentData}
          approved={assignmentData.graded}
          courseId={
            Array.isArray(params.courseId)
              ? params.courseId[0]
              : params.courseId
          }
        />
      )}
    </div>
  );
};

export default GradingPage;
