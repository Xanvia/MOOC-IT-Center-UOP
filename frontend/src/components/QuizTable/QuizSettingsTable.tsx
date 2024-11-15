import Link from "next/link";
import React from "react";

interface QuizData {
  name: string;
  type: "Quiz" | "Code";
  grade: number;
  graded: boolean;
  id: string;
}

interface QuizSettingsTableProps {
  data: QuizData[];
  onManageQuizClick: (quiz: QuizData) => void; // Callback for managing the quiz
}

const QuizSettingsTable = ({
  data,
  onManageQuizClick,
}: QuizSettingsTableProps) => {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="overflow-auto max-h-[480px]">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Quiz Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Grade
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Grade Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((quiz, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{quiz.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{quiz.grade}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      quiz.graded
                        ? "bg-green-100 text-green-800"
                        : !quiz.graded
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {quiz.graded ? "Graded" : "Not Finalized Grading"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link href={`grade/${quiz.id}`}>
                    <button
                      onClick={() => onManageQuizClick(quiz)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600"
                    >
                      Grade Quiz
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuizSettingsTable;
