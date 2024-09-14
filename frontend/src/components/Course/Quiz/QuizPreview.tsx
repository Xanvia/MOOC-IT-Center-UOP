// QuizPreview.tsx
"use client";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import React, { useState } from "react";

interface QuizPreviewProps {
  questions: any[];
  quizTitle: string;
}

const QuizPreview: React.FC<QuizPreviewProps> = ({ questions, quizTitle }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string | Set<string> | any;
  }>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleOptionChange = (questionIndex: number, option: string) => {
    setSelectedAnswers((prev) => {
      if (questions[questionIndex].type === "single") {
        return { ...prev, [questionIndex]: option };
      } else if (questions[questionIndex].type === "multiple") {
        const newSelectedAnswers = new Set(
          (prev[questionIndex] as Set<string>) || []
        );
        if (newSelectedAnswers.has(option)) {
          newSelectedAnswers.delete(option);
        } else {
          newSelectedAnswers.add(option);
        }
        return { ...prev, [questionIndex]: newSelectedAnswers };
      } else {
        return { ...prev, [questionIndex]: option };
      }
    });
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleSave = () => {
    console.log(selectedAnswers);
  };

  return (
    <div className="questions-preview p-8 bg-white rounded-md">
      <h2 className="text-2xl font-semibold p-4 mb-6">{quizTitle}</h2>
      {questions.map((q, index) => (
        <div key={index} className="question mb-6 px-4">
          <h3 className="text-lg font-semibold mb-2">{q.question}</h3>
          {q.type === "single" || q.type === "multiple" ? (
            <ul className="list-none">
              {q.answers.map((option: string, i: number) => (
                <li key={i} className="mb-2">
                  <label className="inline-flex px-5 items-center">
                    {q.type === "single" ? (
                      <input
                        type="radio"
                        name={`preview-question-${index}`}
                        value={option}
                        checked={selectedAnswers[index] === option}
                        onChange={() => handleOptionChange(index, option)}
                        className="form-radio text-indigo-600 mr-2"
                      />
                    ) : (
                      <input
                        type="checkbox"
                        name={`preview-question-${index}`}
                        value={option}
                        checked={
                          (selectedAnswers[index] as Set<string>)?.has(
                            option
                          ) || false
                        }
                        onChange={() => handleOptionChange(index, option)}
                        className="form-checkbox text-indigo-600 mr-2"
                      />
                    )}
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          ) : q.type === "open_ended" ? (
            <div>
              <input
                type="textarea"
                name={`preview-question-${index}`}
                value={selectedAnswers[index] || ""}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          ) : null}
          {showResults && q.type !== "open_ended" && (
            <p
              className={`mt-2 ${
                q.type === "single"
                  ? selectedAnswers[index] === q.answers[0]
                    ? "text-green-500"
                    : "text-red-500"
                  : Array.from(selectedAnswers[index] || []).every((ans) =>
                      q.answers.includes(ans)
                    ) &&
                    Array.from(selectedAnswers[index] || []).length ===
                      q.answers.length
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {q.type === "single"
                ? selectedAnswers[index] === q.answers[0]
                  ? "Correct!"
                  : `Incorrect! The correct answer is ${q.answers[0]}`
                : Array.from(selectedAnswers[index] || []).every((ans) =>
                    q.answers.includes(ans)
                  ) &&
                  Array.from(selectedAnswers[index] || []).length ===
                    q.answers.length
                ? "Correct!"
                : `Incorrect! The correct answers are ${q.answers.join(", ")}`}
            </p>
          )}
        </div>
      ))}
      <div className="flex p-4 justify-end">
        <SecondaryButton text="Submit" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default QuizPreview;
