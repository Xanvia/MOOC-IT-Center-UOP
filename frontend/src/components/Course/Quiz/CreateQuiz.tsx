"use client";
import React, { useState } from "react";

const CreateQuiz: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const addQuestion = () => {
    setQuestions([...questions, { question: currentQuestion, options: currentOptions, answer: correctAnswer }]);
    setCurrentQuestion("");
    setCurrentOptions([]);
    setCorrectAnswer("");
  };

  const addOption = () => {
    setCurrentOptions([...currentOptions, currentAnswer]);
    setCurrentAnswer("");
  };

  const handleOptionChange = (questionIndex: number, option: string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: option }));
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  return (
    <div className="quiz-creator-container p-6 bg-blue-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Create Quiz</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Enter question"
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Enter answer option"
          value={currentAnswer}
          onChange={(e) => setCurrentAnswer(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <button
          onClick={addOption}
          className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 mb-4"
        >
          Add Option
        </button>
        <div className="mb-4">
          {currentOptions.map((option, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="radio"
                name="correct-answer"
                value={option}
                checked={correctAnswer === option}
                onChange={() => setCorrectAnswer(option)}
                className="form-radio text-indigo-600 mr-2"
              />
              <span>{option}</span>
            </div>
          ))}
        </div>
        <button
          onClick={addQuestion}
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
        >
          Add Question
        </button>
      </div>
      <div className="questions-preview">
        <h2 className="text-2xl font-semibold mb-4">Preview</h2>
        {questions.map((q, index) => (
          <div key={index} className="question mb-6">
            <h3 className="text-xl font-semibold mb-2">{q.question}</h3>
            <ul className="list-none">
              {q.options.map((option: string, i: number) => (
                <li key={i} className="mb-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name={`preview-question-${index}`}
                      value={option}
                      checked={selectedAnswers[index] === option}
                      onChange={() => handleOptionChange(index, option)}
                      className="form-radio text-indigo-600 mr-2"
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
            {showResults && (
              <p className={`mt-2 ${selectedAnswers[index] === q.answer ? 'text-green-500' : 'text-red-500'}`}>
                {selectedAnswers[index] === q.answer ? "Correct!" : `Incorrect! The correct answer is ${q.answer}`}
              </p>
            )}
          </div>
        ))}
        <button
          onClick={handleSubmit}
          className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateQuiz;
