"use client";
import React, { useState } from "react";

const CreateQuiz: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<Set<string>>(new Set());
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: Set<string> }>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const [answerType, setAnswerType] = useState<string>("single");

  const addQuestion = () => {
    if (!currentQuestion || currentOptions.length < 2) return;
    setQuestions([...questions, { question: currentQuestion, options: currentOptions, answers: Array.from(correctAnswers), type: answerType }]);
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

  const handleOptionChange = (questionIndex: number, option: string) => {
    setSelectedAnswers(prev => {
      const newSelectedAnswers = new Set(prev[questionIndex] || []);
      if (newSelectedAnswers.has(option)) {
        newSelectedAnswers.delete(option);
      } else {
        newSelectedAnswers.add(option);
      }
      return { ...prev, [questionIndex]: newSelectedAnswers };
    });
  };

  const handleCorrectAnswerChange = (option: string) => {
    setCorrectAnswers(prev => {
      const newCorrectAnswers = new Set(prev);
      if (newCorrectAnswers.has(option)) {
        newCorrectAnswers.delete(option);
      } else {
        newCorrectAnswers.add(option);
      }
      return newCorrectAnswers;
    });
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  return (
    <div className="quiz-creator-container p-10 bg-gray-100 rounded-lg shadow-lg">
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
            disabled={!currentQuestion}
          />
          <select
            value={answerType}
            onChange={(e) => setAnswerType(e.target.value)}
            className="p-2 border rounded-lg"
            disabled={!currentQuestion}
          >
            <option value="single">Single Correct Answer</option>
            <option value="multiple">Multiple Correct Answers</option>
          </select>
          <button
            onClick={addOption}
            className={`py-2 px-4 rounded-lg transition duration-300 ${currentQuestion ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-400 text-gray-600 cursor-not-allowed'}`}
            disabled={!currentQuestion || !currentAnswer}
          >
            Add Option
          </button>
        </div>
        {currentOptions.length > 0 && (
          <div className="mb-4 bg-blue-100 p-4 rounded-md">
            <p className="text-lg font-semibold mb-2">Select the correct {answerType === "single" ? "answer" : "answers"} before add the question:</p>
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
            onClick={addQuestion}
            className={`py-2 px-8 rounded-lg transition duration-300 ${currentOptions.length < 2 ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
            disabled={currentOptions.length < 2}
          >
            Add Question
          </button>
        </div>
      </div>
      <h2 className="text-2xl font-semibold p-4 mb-6">Preview</h2>
      <div className="questions-preview p-8 bg-blue-100 rounded-md ">
        
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
                        checked={selectedAnswers[index]?.has(option) || false}
                        onChange={() => handleOptionChange(index, option)}
                        className="form-radio text-indigo-600 mr-2"
                      />
                    ) : (
                      <input
                        type="checkbox"
                        name={`preview-question-${index}`}
                        value={option}
                        checked={selectedAnswers[index]?.has(option) || false}
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
              <p className={`mt-2 ${Array.from(selectedAnswers[index] || []).every(ans => q.answers.includes(ans)) && Array.from(selectedAnswers[index] || []).length === q.answers.length ? 'text-green-500' : 'text-red-500'}`}>
                {Array.from(selectedAnswers[index] || []).every(ans => q.answers.includes(ans)) && Array.from(selectedAnswers[index] || []).length === q.answers.length ? "Correct!" : `Incorrect! The correct answers are ${q.answers.join(", ")}`}
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
    </div>
  );
};

export default CreateQuiz;
