import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

interface Answer {
  text: string;
  is_correct: boolean;
}

interface Question {
  id: number;
  text: string;
  question_type: "SC" | "MC" | "OE";
  score: number;
  answers: Answer[];
}

interface QuizContent {
  questions: Question[];
  student_answers: {
    [key: string]: string | string[] | { text: string; grade: number };
  };
  grade: number;
  graded: boolean;
  grade_approved: boolean;
}

interface CompletedQuizProps {
  content: QuizContent;
}

const CompletedQuiz: React.FC<CompletedQuizProps> = ({ content }) => {
  const { questions, student_answers, grade, graded, grade_approved } = content;
  const totalPoints = questions.reduce((sum, q) => sum + q.score, 0);

  const renderSingleChoice = (question: Question) => {
    const studentAnswer = student_answers[question.id] as string;
    const correctAnswer = question.answers.find(a => a.is_correct)?.text || '';
    const isCorrect = question.answers.find(a => a.text === studentAnswer)?.is_correct || false;

    return (
      <div className="mt-2">
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            checked={true}
            readOnly
            disabled
            className="form-radio text-blue-600"
          />
          <span className={`${isCorrect ? "text-green-600" : "text-red-600"} font-medium`}>
            {studentAnswer}
          </span>
        </div>
        {!isCorrect && (
          <div className="mt-2 text-green-600">
            Correct answer: {correctAnswer}
          </div>
        )}
      </div>
    );
  };

  const renderMultipleChoice = (question: Question) => {
    const studentAnswers = student_answers[question.id] as string[];
    const correctAnswers = question.answers
      .filter(a => a.is_correct)
      .map(a => a.text);

    const allCorrect = studentAnswers.every(ans => 
      question.answers.find(a => a.text === ans)?.is_correct
    ) && studentAnswers.length === correctAnswers.length;

    return (
      <div className="mt-2">
        {studentAnswers.map((selected, idx) => {
          const isCorrect = question.answers.find(a => a.text === selected)?.is_correct || false;
          return (
            <div key={idx} className="flex items-center space-x-2 mb-1">
              <input
                type="checkbox"
                checked={true}
                readOnly
                disabled
                className="form-checkbox text-blue-600"
              />
              <span className={`${isCorrect ? "text-green-600" : "text-red-600"} font-medium`}>
                {selected}
              </span>
            </div>
          );
        })}
        {!allCorrect && (
          <div className="mt-2 text-green-600">
            Correct answers: {correctAnswers.join(", ")}
          </div>
        )}
      </div>
    );
  };

  const renderOpenEnded = (question: Question) => {
    const answer = student_answers[question.id] as { text: string; grade: number };

    return (
      <div className="mt-2">
        <div className="space-y-2">
          <label className="block font-medium">Your Answer:</label>
          <div className="border p-2 rounded bg-gray-50 min-h-[100px]">
            {answer.text}
          </div>
          {graded && (
            <div className="text-right">
              <span className="font-medium">
                Score: {answer.grade}/{question.score}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderGradingStatus = () => {
    return (
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-gray-50 rounded-lg mb-6">
        <div className="flex items-center gap-2">
          {graded ? (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : (
            <XCircle className="w-5 h-5 text-yellow-500" />
          )}
          <span className={`font-medium ${graded ? 'text-green-600' : 'text-yellow-600'}`}>
            {graded ? 'Graded' : 'Pending Grading'}
          </span>
        </div>
        {graded && (
          <div className="flex items-center gap-2">
            {grade_approved ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-yellow-500" />
            )}
            <span className={`font-medium ${grade_approved ? 'text-green-600' : 'text-yellow-600'}`}>
              {grade_approved ? 'Grades Approved' : 'Pending Approval'}
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {renderGradingStatus()}

      {questions.map((question) => (
        <div key={question.id} className="border p-4 mb-4 bg-white rounded shadow-sm">
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
        </div>
      ))}

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="text-lg font-medium text-center">
          {graded ? (
            `Final Score: ${grade}/${totalPoints}`
          ) : (
            "Quiz submitted - Awaiting grading"
          )}
        </div>
      </div>
    </div>
  );
};

export default CompletedQuiz;