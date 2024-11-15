"use client";
import React, { useState } from "react";
import Head from "next/head";

interface Question {
  question: string;
  studentAnswer: string | string[]; // Single string for open-ended, array for MCQs
  correctAnswer?: string[]; // Optional for open-ended
  grade?: number; // Only for open-ended
}

interface GradedQuiz {
  type: "MCQ" | "Open-ended";
  questions: Question[];
}

const dummyMCQQuiz: GradedQuiz = {
  type: "MCQ",
  questions: [
    {
      question: "Which of the following are programming languages?",
      studentAnswer: ["Python", "HTML"],
      correctAnswer: ["Python", "JavaScript", "Java"],
    },
    {
      question: "Select the primary colors.",
      studentAnswer: ["Red", "Green"],
      correctAnswer: ["Red", "Blue", "Yellow"],
    },
    {
      question: "Which numbers are even?",
      studentAnswer: ["2", "4", "5"],
      correctAnswer: ["2", "4", "6"],
    },
  ],
};

const dummyOpenEndedQuiz: GradedQuiz = {
  type: "Open-ended",
  questions: [
    {
      question: "Explain the significance of the Industrial Revolution.",
      studentAnswer:
        "The Industrial Revolution was a turning point in modern history.",
    },
    {
      question: "Describe the process of photosynthesis.",
      studentAnswer: "Photosynthesis converts sunlight into energy for plants.",
    },
  ],
};

const QuizzesGradePage = () => {
  const [quiz, setQuiz] = useState<GradedQuiz>(dummyMCQQuiz); // Default to MCQ quiz
  const [grades, setGrades] = useState<number[]>(new Array(dummyOpenEndedQuiz.questions.length).fill(0));

  const handleGradeChange = (index: number, value: string) => {
    const updatedGrades = [...grades];
    updatedGrades[index] = parseFloat(value);
    setGrades(updatedGrades);
  };

  const handleFinalizeGrade = () => {
    console.log("Grades finalized:", grades);
    alert("Grades have been finalized!");
  };

  const handleQuizToggle = () => {
    setQuiz(quiz.type === "MCQ" ? dummyOpenEndedQuiz : dummyMCQQuiz);
    if (quiz.type === "Open-ended") {
      setGrades(new Array(dummyMCQQuiz.questions.length).fill(0));
    } else {
      setGrades(new Array(dummyOpenEndedQuiz.questions.length).fill(0));
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Head>
        <title>OpenEd - Quizzes Grades</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="p-6 bg-gray-50 min-h-screen w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Grading Quiz: {quiz.type === "MCQ" ? "MCQ" : "Open-ended"}</h1>
          <button
            onClick={handleQuizToggle}
            className="bg-purple-500 text-white px-4 py-2 rounded shadow hover:bg-purple-600"
          >
            Switch to {quiz.type === "MCQ" ? "Open-ended" : "MCQ"} Quiz
          </button>
        </div>

        {quiz.questions.map((q, index) => (
          <div key={index} className="border p-4 mb-4 bg-white rounded shadow-sm">
            <p className="font-semibold text-lg">{q.question}</p>

            {quiz.type === "MCQ" ? (
              <ul className="mt-2 space-y-1">
              {q.correctAnswer?.map((option, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    readOnly
                    checked={Array.isArray(q.studentAnswer) && q.studentAnswer.includes(option)}
                    className="form-checkbox text-blue-600"
                  />
                  <label className={`text-gray-700 ${q.correctAnswer && q.correctAnswer.includes(option) ? "font-semibold text-green-600" : ""}`}>
                    {option}
                  </label>
                </li>
              ))}
            </ul>
            ) : (
              <div className="mt-2">
                <p><strong>Student's Answer:</strong> {q.studentAnswer}</p>
                <label className="block font-medium mt-4 mb-1">Grade this answer:</label>
                <input
                  type="number"
                  min={0}
                  max={10}
                  value={grades[index]}
                  onChange={(e) => handleGradeChange(index, e.target.value)}
                  className="border p-2 rounded w-24"
                />
              </div>
            )}
          </div>
        ))}

        <button
          onClick={handleFinalizeGrade}
          className="mt-6 w-50% bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600"
        >
          Finalize Grade
        </button>
      </div>
    </div>
  );
};

export default QuizzesGradePage;
