"use client"

import React, { useState } from "react";

interface Question {
  question: string;
  studentAnswer: string | string[];
  correctAnswer?: string[];
  options?: string[];
  grade?: number;
}

interface QuizData {
  type: "MCQ" | "Open-ended";
  questions: Question[];
}

interface QuizGraderProps {
  quizData: QuizData;
}

const QuizGrader: React.FC<QuizGraderProps> = ({ quizData }) => {
  const [grades, setGrades] = useState<number[]>(
    new Array(quizData.questions.length).fill(0)
  );

  const handleGradeChange = (index: number, value: string) => {
    const parsedValue = parseFloat(value);
    const updatedGrades = [...grades];
    updatedGrades[index] = isNaN(parsedValue) ? 0 : parsedValue;
    setGrades(updatedGrades);
  };

  const handleFinalizeGrade = () => {
    // Here you would typically make an API call to save the grades
    console.log("Grades finalized:", grades);
  };

  return (
    <div className="space-y-6">
      {quizData.questions.map((q, index) => (
        <div key={index} className="border p-4 mb-4 bg-white rounded shadow-sm">
          <p className="font-semibold text-lg">{q.question}</p>

          {quizData.type === "MCQ" ? (
            <ul className="mt-2 space-y-1">
              {q.options?.map((option, idx) => {
                const isCorrectAnswer = q.correctAnswer?.includes(option);
                const isStudentAnswer = Array.isArray(q.studentAnswer) && 
                  q.studentAnswer.includes(option);

                return (
                  <li key={idx} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      readOnly
                      checked={isStudentAnswer}
                      className="form-radio text-blue-600"
                    />
                    <label className={`text-gray-700 ${
                      isCorrectAnswer && isStudentAnswer
                        ? "font-semibold text-purple-600"
                        : isCorrectAnswer
                        ? "font-semibold text-green-600"
                        : isStudentAnswer
                        ? "font-semibold text-red-600"
                        : ""
                    }`}>
                      {option}
                    </label>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="mt-2">
              <label className="block font-medium mb-1">Student's Answer:</label>
              <textarea
                readOnly
                value={Array.isArray(q.studentAnswer) 
                  ? q.studentAnswer.join(" ") 
                  : q.studentAnswer}
                className="border p-2 rounded w-full bg-gray-100 text-gray-800"
              />
              <div className="w-4/4 mt-2 mr-2 text-right">
                <label className="block font-medium mb-1">Grade:</label>
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
        className="mt-6 bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600"
      >
        Finalize Grade
      </button>
    </div>
  );
};

export default QuizGrader;