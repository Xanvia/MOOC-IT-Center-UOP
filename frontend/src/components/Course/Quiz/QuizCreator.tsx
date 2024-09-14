"use client";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import { createQuizQuestion } from "@/services/course.service";
import React, { useState } from "react";
import { toast } from "sonner";

interface QuizCreatorProps {
  addQuestion: (question: any) => void;
  quizId: number;
}

const QuizCreator: React.FC<QuizCreatorProps> = ({ addQuestion, quizId }) => {
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<Set<string>>(new Set());
  const [answerType, setAnswerType] = useState<string>("SC");

  const handleAddQuestion = async () => {
    if (!currentQuestion) {
      toast.warning("Please enter a question.");
      return;
    }

    if (answerType !== "OE") {
      if (currentOptions.length < 2) {
        toast.warning("Please add at least two answer options.");
        return;
      }

      if (correctAnswers.size === 0) {
        toast.warning("Please select at least one correct answer.");
        return;
      }
    }

    const formattedAnswers = currentOptions.map((option) => ({
      text: option,
      is_correct: correctAnswers.has(option) ? "True" : "False",
    }));

    // Prepare data to be sent
    const questionData = {
      text: currentQuestion,
      question_type: answerType,
      answers: formattedAnswers,
    };
    try {
      await createQuizQuestion(
        quizId,
        questionData.text,
        questionData.question_type,
        questionData.answers
      );
      toast.success("Question added successfully!");
    } catch (error) {
      toast.error("Failed to add question.");
    }

    setCurrentQuestion("");
    setCurrentOptions([]);
    setCorrectAnswers(new Set());
    setAnswerType("SC");
    addQuestion(questionData);
  };

  const addOption = () => {
    if (!currentQuestion || !currentAnswer) return;
    setCurrentOptions([...currentOptions, currentAnswer]);
    setCurrentAnswer("");
  };

  const handleCorrectAnswerChange = (option: string) => {
    setCorrectAnswers((prev) => {
      if (answerType === "SC") {
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
            <option value="SC">Single Correct Answer</option>
            <option value="MC">Multiple Correct Answers</option>
            <option value="OE">Open Ended</option>
          </select>
          <button
            onClick={addOption}
            className={`py-2 px-4 rounded-lg transition duration-300 ${
              currentQuestion && answerType !== "open_ended"
                ? "bg-primary text-white hover:bg-primary_test"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
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
              {answerType === "SC" ? "answer" : "answers"} before adding the
              question:
            </p>
            {currentOptions.map((option, index) => (
              <div key={index} className="flex items-center mb-2 ml-4">
                {answerType === "SC" ? (
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
          <SecondaryButton text="Add Question" onClick={handleAddQuestion} />
        </div>
      </div>
    </div>
  );
};

export default QuizCreator;
