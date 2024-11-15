"use client";
import React, { useState } from "react";
import Head from "next/head";

interface Question {
  question: string;
  studentAnswer: string | string[]; // Single string for open-ended, array for MCQs
  correctAnswer?: string[]; // Optional for open-ended questions
  options?: string[]; // Options for MCQ questions
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
      question: "Which of the following highly uses the concept of an array?",
      studentAnswer: ["Caching"], // Selected by the student
      correctAnswer: ["Spatial locality"], // Correct answer
      options: ["Binary Search tree", "Caching", "Spatial locality", "Scheduling of Processes"]
    },
    {
      question: "Which one of the following is the size of int arr[9] assuming that int is of 4 bytes?",
      studentAnswer: ["35"], // Selected by the student
      correctAnswer: ["36"], // Correct answer
      options: ["9", "36", "35", "None of the above"]
    }
  ]
};

const dummyOpenEndedQuiz: GradedQuiz = {
  type: "Open-ended",
  questions: [
    {
      question: "Explain the significance of the Industrial Revolution.",
      studentAnswer: "The Industrial Revolution was a turning point in modern history.",
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
    const parsedValue = parseFloat(value);
  
    // Update the grade only if the value is a valid number
    const updatedGrades = [...grades];
    updatedGrades[index] = isNaN(parsedValue) ? 0 : parsedValue;
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
        <h1 className="text-2xl font-bold mb-4">Introduction to Web Quiz 1</h1>

        {quiz.questions.map((q, index) => (
          <div key={index} className="border p-4 mb-4 bg-white rounded shadow-sm">
            <p className="font-semibold text-lg">{q.question}</p>

            {quiz.type === "MCQ" ? (
              <ul className="mt-2 space-y-1">
              {q.options?.map((option, idx) => { // Use optional chaining to check if options exist
                const isCorrectAnswer = q.correctAnswer?.includes(option);
                const isStudentAnswer = Array.isArray(q.studentAnswer) && q.studentAnswer.includes(option);
            
                return (
                  <li key={idx} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      readOnly
                      checked={isStudentAnswer}
                      className="form-radio text-blue-600"
                    />
                    <label
                      className={`text-gray-700 ${
                        isCorrectAnswer && isStudentAnswer
                          ? "font-semibold text-purple-600" // Both correct and student answer
                          : isCorrectAnswer
                          ? "font-semibold text-green-600" // Only correct answer
                          : isStudentAnswer
                          ? "font-semibold text-red-600" // Incorrect student answer
                          : ""
                      }`}
                    >
                      {option}
                    </label>
                  </li>
                );
              }) || <p>No options available</p>} {/* Display message if options are undefined */}
            </ul>
            ) : (
              <div className="mt-2">
                <label className="block font-medium mb-1">Student's Answer:</label>
                  <textarea
                    readOnly
                    value={Array.isArray(q.studentAnswer) ? q.studentAnswer.join(" ") : q.studentAnswer} // Handle both string and array of strings
                    className="border p-2 rounded w-full bg-gray-100 text-gray-800"
                  />
                <div className="w-4/4 mt-2 mr-2 text-right">
                  <label className="block font-medium mb-1">Grade this answer:</label>
                  <input
                    type="text"
                    value={grades[index]}
                    onChange={(e) => handleGradeChange(index, e.target.value)}
                    className="border p-2 rounded w-20 text-center"
                  />
                </div>
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
