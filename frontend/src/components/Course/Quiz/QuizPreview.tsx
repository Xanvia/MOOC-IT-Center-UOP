import React, { useState } from "react";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import { submitQuiz } from "@/services/course.service";
import { toast } from "sonner";

interface Answer {
  text: string;
  is_correct: boolean;
}

interface Question {
  id: number;
  text: string;
  question_type: string;
  answers: Answer[];
  score: number;
}

interface QuizPreviewProps {
  questions: Question[];
  quizTitle: string;
  quizId: number;
  isCompleted?: boolean;
  setIsFinished: (isFinished: boolean) => void;
}

const QuizPreview: React.FC<QuizPreviewProps> = ({
  questions,
  quizTitle,
  quizId,
  isCompleted,
  setIsFinished,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string | Set<string>;
  }>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const handleOptionChange = (questionIndex: number, option: string) => {
    setSelectedAnswers((prev) => {
      if (questions[questionIndex].question_type === "SC") {
        return { ...prev, [questionIndex]: option };
      } else if (questions[questionIndex].question_type === "MC") {
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

  const calculateScore = () => {
    let totalScore = 0;
    questions.forEach((question, index) => {
      if (question.question_type !== "OE") {
        const selectedAnswer = selectedAnswers[index];
        if (question.question_type === "SC") {
          const correctAnswer = question.answers.find((a) => a.is_correct);
          if (correctAnswer && selectedAnswer === correctAnswer.text) {
            totalScore += question.score;
          }
        } else if (question.question_type === "MC") {
          const selectedSet = selectedAnswer as Set<string> | undefined;
          const correctAnswers = question.answers.filter((a) => a.is_correct);
          if (
            selectedSet &&
            selectedSet.size === correctAnswers.length &&
            correctAnswers.every((a) => selectedSet.has(a.text))
          ) {
            totalScore += question.score;
          }
        }
      }
    });
    return totalScore;
  };

  const createStudentAnswers = () => {
    const studentAnswers: { [key: number]: string | string[] } = {};
    questions.forEach((question, index) => {
      const selectedAnswer = selectedAnswers[index];
      if (question.question_type === "SC" || question.question_type === "OE") {
        if (selectedAnswer !== undefined) {
          studentAnswers[question.id] = selectedAnswer as string;
        }
      } else if (question.question_type === "MC") {
        if (selectedAnswer instanceof Set) {
          studentAnswers[question.id] = Array.from(selectedAnswer);
        } else {
          studentAnswers[question.id] = [];
        }
      }
    });
    return studentAnswers;
  };

  const handleSubmit = async () => {
    const score = calculateScore();
    const studentAnswers = createStudentAnswers();

    try {
      // await submitQuiz(quizId, score, studentAnswers);
      setShowResults(true);
      setQuizSubmitted(true);
      setIsFinished(true);
      toast.success("Quiz Submitted");
    } catch (error) {
      console.error("Failed to submit quiz:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  const getAnswerStyle = (questionIndex: number, answer: Answer) => {
    if (!showResults) return "";

    const isSelected =
      questions[questionIndex].question_type === "SC"
        ? selectedAnswers[questionIndex] === answer.text
        : (selectedAnswers[questionIndex] as Set<string>)?.has(answer.text);

    if (answer.is_correct) {
      return "bg-green-100 border-green-500 text-green-700";
    } else if (isSelected && !answer.is_correct) {
      return "bg-red-100 border-red-500 text-red-700";
    }
    return "";
  };

  return (
    <div className="questions-preview p-8 bg-white rounded-md">
      <h2 className="text-2xl font-semibold p-4 mb-6">{quizTitle}</h2>
      {questions.map((q, index) => (
        <div key={index} className="question mb-6 px-4">
          <h3 className="text-lg font-semibold mb-2">{q.text}</h3>
          {q.question_type === "SC" || q.question_type === "MC" ? (
            <ul className="list-none">
              {q.answers.map((answer, i) => (
                <li key={i} className="mb-2 ml-8">
                  <label
                    className={`inline-flex px-5 py-2 items-center border rounded-md ${getAnswerStyle(
                      index,
                      answer
                    )}`}
                  >
                    {q.question_type === "SC" ? (
                      <input
                        type="radio"
                        name={`preview-question-${index}`}
                        value={answer.text}
                        checked={selectedAnswers[index] === answer.text}
                        onChange={() => handleOptionChange(index, answer.text)}
                        className="form-radio text-indigo-600 mr-2"
                        disabled={showResults}
                      />
                    ) : (
                      <input
                        type="checkbox"
                        name={`preview-question-${index}`}
                        value={answer.text}
                        checked={
                          (selectedAnswers[index] as Set<string>)?.has(
                            answer.text
                          ) || false
                        }
                        onChange={() => handleOptionChange(index, answer.text)}
                        className="form-checkbox text-indigo-600 mr-2"
                        disabled={showResults}
                      />
                    )}
                    {answer.text}
                    {showResults && answer.is_correct && (
                      <span className="ml-2 text-green-600">✓</span>
                    )}
                  </label>
                </li>
              ))}
            </ul>
          ) : q.question_type === "OE" ? (
            <div>
              <textarea
                name={`preview-question-${index}`}
                value={(selectedAnswers[index] as string) || ""}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                rows={4}
                disabled={showResults}
              />
            </div>
          ) : null}
          {showResults && q.question_type !== "OE" && (
            <p className="mt-2 font-semibold">
              {q.question_type === "SC"
                ? q.answers.find((ans) => ans.is_correct)?.text ===
                  selectedAnswers[index]
                  ? "Correct!"
                  : "Incorrect!"
                : Array.from(
                    (selectedAnswers[index] as Set<string>) || []
                  ).every((ans) =>
                    q.answers.some(
                      (answer) => answer.is_correct && answer.text === ans
                    )
                  ) &&
                  Array.from((selectedAnswers[index] as Set<string>) || [])
                    .length === q.answers.filter((ans) => ans.is_correct).length
                ? "Correct!"
                : "Incorrect!"}
            </p>
          )}
        </div>
      ))}
      {!isCompleted && !quizSubmitted && (
        <div className="flex p-4 justify-end">
          <SecondaryButton text="Submit" onClick={handleSubmit} />
        </div>
      )}
      {showResults && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h3 className="text-xl font-semibold">Quiz Results</h3>
          <p className="mt-2">Total Score: {calculateScore()}</p>
        </div>
      )}
    </div>
  );
};

export default QuizPreview;
