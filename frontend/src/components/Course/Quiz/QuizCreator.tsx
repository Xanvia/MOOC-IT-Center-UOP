"use client";
import React, { useState } from "react";

interface QuizCreatorProps {
  addQuestion: (question: any) => void;
}

const QuizCreator: React.FC<QuizCreatorProps> = ({ addQuestion }) => {
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<Set<string>>(new Set());
  const [answerType, setAnswerType] = useState<string>("single");

  const handleAddQuestion = () => {
    if (
      !currentQuestion ||
      (answerType !== "open_ended" && correctAnswers.size === 0)
    )
      return;
    addQuestion({
      question: currentQuestion,
      options: currentOptions,
      answers: answerType === "open_ended" ? [] : Array.from(correctAnswers),
      type: answerType,
    });
    setCurrentQuestion("");
    setCurrentOptions([]);
    setCorrectAnswers(new Set());
    setAnswerType("single");
  };

  const addOption = () => {
    if (!currentQuestion || !currentAnswer) return;
    setCurrentOptions([...currentOptions, currentAnswer]);
    setCurrentAnswer("");
  };

  const handleCorrectAnswerChange = (option: string) => {
    setCorrectAnswers((prev) => {
      if (answerType === "single") {
        return new Set([option]);
      } else {
        const newCorrectAnswers = new Set(prev);
        if (newCorrectAnswers.has(option)) {
          newCorrectAnswers.delete(option);
        } else {
          newCorrectAnswers.add(option);
        }
        return newCorrectAnswers;
      }
    });
  };

  return (
    <div className="quiz-creator p-10 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-4">Create Quiz</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Enter question"
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <div className="flex items-center mb-8 space-x-2">
          <input
            type="text"
            placeholder="Enter answer option"
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            className="flex-grow p-2 border rounded-lg"
            disabled={!currentQuestion || answerType === "open_ended"}
          />
          <select
            value={answerType}
            onChange={(e) => setAnswerType(e.target.value)}
            className="p-2 border rounded-lg"
            disabled={!currentQuestion}
          >
            <option value="single">Single Correct Answer</option>
            <option value="multiple">Multiple Correct Answers</option>
            <option value="open_ended">Open Ended</option>
          </select>
          <button
            onClick={addOption}
            className={`py-2 px-4 rounded-lg transition duration-300 ${
              currentQuestion && answerType !== "open_ended"
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-400 text-gray-600 cursor-not-allowed"
            }`}
            disabled={
              !currentQuestion || !currentAnswer || answerType === "open_ended"
            }
          >
            Add Option
          </button>
        </div>
        {currentOptions.length > 0 && answerType !== "open_ended" && (
          <div className="mb-4 bg-blue-100 p-4 rounded-md">
            <p className="text-lg font-semibold mb-2">
              Select the correct{" "}
              {answerType === "single" ? "answer" : "answers"} before adding the
              question:
            </p>
            {currentOptions.map((option, index) => (
              <div key={index} className="flex items-center mb-2 ml-4">
                {answerType === "single" ? (
                  <input
                    type="radio"
                    name="correct-answer"
                    value={option}
                    checked={correctAnswers.has(option)}
                    onChange={() => handleCorrectAnswerChange(option)}
                    className="form-radio text-indigo-600 mr-2"
                  />
                ) : (
                  <input
                    type="checkbox"
                    name="correct-answer"
                    value={option}
                    checked={correctAnswers.has(option)}
                    onChange={() => handleCorrectAnswerChange(option)}
                    className="form-checkbox text-indigo-600 mr-2"
                  />
                )}
                <span>{option}</span>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-center">
          <button
            onClick={handleAddQuestion}
            className={`py-2 px-8 rounded-lg transition duration-300 ${"bg-indigo-600 text-white hover:bg-indigo-700"}`}
          >
            Add Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizCreator;
