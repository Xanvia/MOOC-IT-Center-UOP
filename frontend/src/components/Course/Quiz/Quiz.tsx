"use client";
import React, { useState } from "react";

const Quiz: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>({});
  const [results, setResults] = useState<{ [key: number]: boolean }>({});

  const questions = [
    {
      question: "What does HTML stand for?",
      options: [
        "A. Hyper Trainer Marking Language",
        "B. Hyper Text Marketing Language",
        "C. Hyper Text Markup Language",
        "D. Hyper Text Marking Language",
      ],
      answer: "C. Hyper Text Markup Language",
    },
    {
      question: "Which HTML tag is used to define an internal style sheet?",
      options: ["A. <style>", "B. <css>", "C. <script>", "D. <link>"],
      answer: "A. <style>",
    },
    {
      question: "Which property is used to change the background color in CSS?",
      options: ["A. bgcolor", "B. color", "C. background-color", "D. bg-color"],
      answer: "C. background-color",
    },
    {
      question: "How do you make a list that lists its items with squares?",
      options: [
        "A. list-style-type: square",
        "B. list-type: square",
        "C. list: square",
        "D. list-square",
      ],
      answer: "A. list-style-type: square",
    },
  ];

  const handleOptionChange = (questionIndex: number, option: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: option }));
  };

  const checkAnswers = () => {
    const newResults: { [key: number]: boolean } = {};
    questions.forEach((question, index) => {
      newResults[index] = selectedAnswers[index] === question.answer;
    });
    setResults(newResults);
  };

  return (
    <div className="quiz-container p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Quiz</h1>
      {questions.map((q, index) => (
        <div key={index} className="question mb-6">
          <h2 className="text-xl font-semibold mb-2">{q.question}</h2>
          <ul className="list-none">
            {q.options.map((option, i) => (
              <li key={i} className="mb-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={selectedAnswers[index] === option}
                    onChange={() => handleOptionChange(index, option)}
                    className="form-radio text-indigo-600"
                  />
                  <span className="ml-2">{option}</span>
                </label>
              </li>
            ))}
          </ul>
          {results[index] !== undefined && (
            <p
              className={`mt-2 ${
                results[index] ? "text-green-500" : "text-red-500"
              }`}
            >
              {results[index]
                ? "Correct!"
                : `Incorrect! The correct answer is ${q.answer}`}
            </p>
          )}
        </div>
      ))}
      <button
        onClick={checkAnswers}
        className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
      >
        Submit
      </button>
    </div>
  );
};

export default Quiz;
