// QuizPreview.tsx
"use client";
import React, { useState } from "react";

interface QuizPreviewProps {
  questions: any[];
}

const QuizPreview: React.FC<QuizPreviewProps> = ({ questions }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string | Set<string> }>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleOptionChange = (questionIndex: number, option: string) => {
    setSelectedAnswers(prev => {
      if (questions[questionIndex].type === "single") {
        return { ...prev, [questionIndex]: option };
      } else {
        const newSelectedAnswers = new Set(prev[questionIndex] as Set<string> || []);
        if (newSelectedAnswers.has(option)) {
          newSelectedAnswers.delete(option);
        } else {
          newSelectedAnswers.add(option);
        }
        return { ...prev, [questionIndex]: newSelectedAnswers };
      }
    });
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  return (
    <div className="questions-preview p-8 bg-blue-100 rounded-md">
      <h2 className="text-2xl font-semibold p-4 mb-6">Preview</h2>
      {questions.map((q, index) => (
        <div key={index} className="question mb-6 px-4">
          <h3 className="text-lg font-semibold mb-2">{q.question}</h3>
          <ul className="list-none">
            {q.options.map((option: string, i: number) => (
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
                      checked={(selectedAnswers[index] as Set<string>)?.has(option) || false}
                      onChange={() => handleOptionChange(index, option)}
                      className="form-checkbox text-indigo-600 mr-2"
                    />
                  )}
                  {option}
                </label>
              </li>
            ))}
          </ul>
          {showResults && (
            <p className={`mt-2 ${q.type === "single" ? (selectedAnswers[index] === q.answers[0] ? 'text-green-500' : 'text-red-500') : (Array.from(selectedAnswers[index] || []).every(ans => q.answers.includes(ans)) && Array.from(selectedAnswers[index] || []).length === q.answers.length ? 'text-green-500' : 'text-red-500')}`}>
              {q.type === "single" ? (selectedAnswers[index] === q.answers[0] ? "Correct!" : `Incorrect! The correct answer is ${q.answers[0]}`) : (Array.from(selectedAnswers[index] || []).every(ans => q.answers.includes(ans)) && Array.from(selectedAnswers[index] || []).length === q.answers.length ? "Correct!" : `Incorrect! The correct answers are ${q.answers.join(", ")}`)}
            </p>
          )}
        </div>
      ))}
      <div className="flex p-4 justify-end">
        <button
          onClick={handleSubmit}
          className="bg-primary text-white font-semibold py-2 px-8 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default QuizPreview;
