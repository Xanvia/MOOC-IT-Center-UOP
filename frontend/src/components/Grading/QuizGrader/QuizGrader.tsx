import React, { useState } from "react";

interface StudentAnswerSC {
  selected_answer: string;
  correct_answer: string;
}

interface StudentAnswerMC {
  selected_answers: string[];
  correct_answers: string[];
}

interface StudentAnswerOE {
  text: {
    text: string;
    grade: number;
  };
}

interface Question {
  id: number;
  text: string;
  question_type: "SC" | "MC" | "OE";
  score: number;
  student_answer: StudentAnswerSC | StudentAnswerMC | StudentAnswerOE;
}

interface QuizGraderProps {
  questions: Question[];
}

const QuizGrader: React.FC<QuizGraderProps> = ({ questions }) => {
  const [grades, setGrades] = useState<{ [key: number]: number }>(
    questions.reduce((acc, q) => ({
      ...acc,
      [q.id]: q.question_type === "OE" ? (q.student_answer as StudentAnswerOE).text.grade : 0
    }), {})
  );

  const handleGradeChange = (questionId: number, value: string) => {
    const parsedValue = parseFloat(value);
    setGrades((prev) => ({
      ...prev,
      [questionId]: isNaN(parsedValue) ? 0 : parsedValue,
    }));
  };

  const handleFinalizeGrade = () => {
    // Typically make an API call to save grades here
    console.log("Grades finalized:", grades);
  };

  const renderSingleChoice = (question: Question) => {
    const answer = question.student_answer as StudentAnswerSC;
    const isCorrect = answer.selected_answer === answer.correct_answer;

    return (
      <div className="mt-2">
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            checked={true}
            readOnly
            className="form-radio text-blue-600"
          />
          <span
            className={`${
              isCorrect ? "text-green-600" : "text-red-600"
            } font-medium`}
          >
            {answer.selected_answer}
          </span>
        </div>
        {!isCorrect && (
          <div className="mt-2 text-green-600">
            Correct answer: {answer.correct_answer}
          </div>
        )}
      </div>
    );
  };

  const renderMultipleChoice = (question: Question) => {
    const answer = question.student_answer as StudentAnswerMC;
    const allCorrect =
      answer.selected_answers.every((ans) =>
        answer.correct_answers.includes(ans)
      ) && answer.selected_answers.length === answer.correct_answers.length;

    return (
      <div className="mt-2">
        {answer.selected_answers.map((selected, idx) => (
          <div key={idx} className="flex items-center space-x-2 mb-1">
            <input
              type="checkbox"
              checked={true}
              readOnly
              className="form-checkbox text-blue-600"
            />
            <span
              className={`${
                answer.correct_answers.includes(selected)
                  ? "text-green-600"
                  : "text-red-600"
              } font-medium`}
            >
              {selected}
            </span>
          </div>
        ))}
        {!allCorrect && (
          <div className="mt-2 text-green-600">
            Correct answers: {answer.correct_answers.join(", ")}
          </div>
        )}
      </div>
    );
  };

  const renderOpenEnded = (question: Question) => {
    const answer = question.student_answer as StudentAnswerOE;

    return (
      <div className="mt-2">
        <label className="block font-medium mb-1">Student&apos;s Answers</label>
        <textarea
          readOnly
          value={answer.text.text}
          className="border p-2 rounded w-full bg-gray-100 text-gray-800 min-h-[100px]"
        />
        <div className="mt-2 text-right">
          <label className="block font-medium mb-1">
            Grade (out of {question.score}):
          </label>
          <input
            type="number"
            value={grades[question.id]}
            onChange={(e) => handleGradeChange(question.id, e.target.value)}
            className="border p-2 rounded w-20 text-center"
            min="0"
            max={question.score}
            step="0.5"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {questions.map((question) => (
        <div
          key={question.id}
          className="border p-4 mb-4 bg-white rounded shadow-sm"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg">{question.text}</h3>
            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {question.question_type === "SC" && "Single Choice"}
              {question.question_type === "MC" && "Multiple Choice"}
              {question.question_type === "OE" && "Open Ended"}
            </span>
          </div>

          {question.question_type === "SC" && renderSingleChoice(question)}
          {question.question_type === "MC" && renderMultipleChoice(question)}
          {question.question_type === "OE" && renderOpenEnded(question)}

          {/* Auto-graded score for SC and MC questions */}
          {(question.question_type === "SC" ||
            question.question_type === "MC") && (
            <div className="mt-4 text-right">
              <span className="font-medium">
                Score:{" "}
                {question.question_type === "SC"
                  ? (question.student_answer as StudentAnswerSC)
                      .selected_answer ===
                    (question.student_answer as StudentAnswerSC).correct_answer
                    ? question.score
                    : 0
                  : (
                      question.student_answer as StudentAnswerMC
                    ).selected_answers.every((ans) =>
                      (
                        question.student_answer as StudentAnswerMC
                      ).correct_answers.includes(ans)
                    ) &&
                    (question.student_answer as StudentAnswerMC)
                      .selected_answers.length ===
                      (question.student_answer as StudentAnswerMC)
                        .correct_answers.length
                  ? question.score
                  : 0}
                /{question.score}
              </span>
            </div>
          )}
        </div>
      ))}

      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
        <div className="text-lg font-medium">
          Total Score:{" "}
          {Object.values(grades).reduce((sum, grade) => sum + grade, 0)}/
          {questions.reduce((sum, q) => sum + q.score, 0)}
        </div>
        <button
          onClick={handleFinalizeGrade}
          className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600"
        >
          Finalize Grade
        </button>
      </div>
    </div>
  );
};

export default QuizGrader;
