import { gradeQuiz } from "@/services/settings.service";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

interface StudentAnswerSC {
  selected_answer: string;
  correct_answer: string;
}

interface StudentAnswerMC {
  selected_answers: string[];
  correct_answers: string[];
}

interface StudentAnswerOE {
  id: string;
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
  grade: number;
  courseId: string;
  gradedI: boolean;
  approvedI: boolean;
}

const QuizGrader: React.FC<QuizGraderProps> = ({
  questions,
  grade,
  courseId,
  gradedI,
  approvedI,
}) => {
  const params = useParams();
  const [graded, setGraded] = useState<boolean>(gradedI);
  const [approved, setApproved] = useState<boolean>(approvedI);
  const [grades, setGrades] = useState<{ [key: number]: number }>(() => {
    return questions.reduce((acc, q) => {
      let score = 0;
      if (q.question_type === "OE") {
        score = (q.student_answer as StudentAnswerOE).text.grade;
      } else if (q.question_type === "SC") {
        const answer = q.student_answer as StudentAnswerSC;
        score = answer.selected_answer === answer.correct_answer ? q.score : 0;
      } else if (q.question_type === "MC") {
        const answer = q.student_answer as StudentAnswerMC;
        score =
          answer.selected_answers.every((ans) =>
            answer.correct_answers.includes(ans)
          ) && answer.selected_answers.length === answer.correct_answers.length
            ? q.score
            : 0;
      }
      return { ...acc, [q.id]: score };
    }, {});
  });

  // Calculate total score based on all grades
  const calculateTotalScore = () => {
    return questions.reduce((total, q) => total + (grades[q.id] || 0), 0);
  };

  const [totalScore, setTotalScore] = useState<number>(calculateTotalScore());

  // Initialize student answers with proper grades
  const [studentAnswers, setStudentAnswers] = useState<any[]>(
    questions.map((q) => ({
      id: q.id,
      answer: q.student_answer,
      grade: grades[q.id] || 0,
    }))
  );

  useEffect(() => {
    const initialGrades = questions.reduce<{ [key: number]: number }>(
      (acc, q) => {
        let score = 0;
        if (q.question_type === "OE") {
          score = (q.student_answer as StudentAnswerOE).text.grade;
        } else if (q.question_type === "SC") {
          const answer = q.student_answer as StudentAnswerSC;
          score =
            answer.selected_answer === answer.correct_answer ? q.score : 0;
        } else if (q.question_type === "MC") {
          const answer = q.student_answer as StudentAnswerMC;
          score =
            answer.selected_answers.every((ans) =>
              answer.correct_answers.includes(ans)
            ) &&
            answer.selected_answers.length === answer.correct_answers.length
              ? q.score
              : 0;
        }
        return { ...acc, [q.id]: score };
      },
      {}
    );

    setGrades(initialGrades);
    setStudentAnswers(
      questions.map((q) => ({
        id: q.id,
        answer: q.student_answer,
        grade: initialGrades[q.id] || 0,
      }))
    );
    setTotalScore(
      Object.values(initialGrades).reduce(
        (sum: number, grade: number) => sum + grade,
        0
      )
    );
  }, [questions]);

  const handleGradeChange = (questionId: number, value: string) => {
    const parsedValue = parseFloat(value);
    const newGrade = isNaN(parsedValue) ? 0 : parsedValue;

    // Update grades
    setGrades((prev) => ({
      ...prev,
      [questionId]: newGrade,
    }));

    // Update student answers
    setStudentAnswers((prev) =>
      prev.map((answer) =>
        answer.id === questionId ? { ...answer, grade: newGrade } : answer
      )
    );

    // Update total score
    const newGrades = {
      ...grades,
      [questionId]: newGrade,
    };
    setTotalScore(
      Object.values(newGrades).reduce((sum, grade) => sum + grade, 0)
    );
  };

  const handleFinalizeGrade = async () => {
    // Create formatted student answers that match backend structure
    const formattedAnswers: { [key: string]: any } = {};

    questions.forEach((question) => {
      const id = question.id.toString();

      if (question.question_type === "SC") {
        // For single choice, just send the selected answer
        formattedAnswers[id] = (
          question.student_answer as StudentAnswerSC
        ).selected_answer;
      } else if (question.question_type === "MC") {
        // For multiple choice, send the array of selected answers
        formattedAnswers[id] = (
          question.student_answer as StudentAnswerMC
        ).selected_answers;
      } else if (question.question_type === "OE") {
        // For open ended, keep the text but update the grade
        formattedAnswers[id] = {
          text: (question.student_answer as StudentAnswerOE).text.text,
          grade: grades[question.id], // Use the updated grade from our grades state
        };
      }
    });

    try {
      await gradeQuiz(
        params.submissionId as string,
        courseId,
        totalScore,
        formattedAnswers
      );
      if (graded == true) {
        setApproved(true);
      }
      setGraded(true);
      toast.success("Successfully updated grades.");
    } catch (error) {
      console.error("Failed to finalize grade:", error);
      alert("Failed to update grades.");
    }
  };
  // Rest of your component remains the same...
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

          {(question.question_type === "SC" ||
            question.question_type === "MC") && (
            <div className="mt-4 text-right">
              <span className="font-medium">
                Score: {grades[question.id]}/{question.score}
              </span>
            </div>
          )}
        </div>
      ))}

      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
        <div className="text-lg font-medium">
          Total Score: {totalScore}/
          {questions.reduce((sum, q) => sum + q.score, 0)}
        </div>
        <div className="space-x-4">
          <button
            onClick={handleFinalizeGrade}
            className={`${
              graded
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white px-6 py-2 rounded shadow`}
            disabled={graded}
          >
            {grade ? "Graded" : "Finalize Grade"}
          </button>
          <button
            onClick={handleFinalizeGrade}
            className={`${
              approved
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            } text-white px-6 py-2 rounded shadow`}
            disabled={approved}
          >
            Approve Grades
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizGrader;
