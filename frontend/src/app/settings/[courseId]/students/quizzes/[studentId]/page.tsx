"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import QuizSettingsTable from "@/components/QuizTable/QuizSettingsTable";
import { useParams } from "next/navigation";
import { getStudetnQuizzes } from "@/services/settings.service";

interface QuizData {
  name: string;
  type: "Quiz" | "Code";
  grade: number;
  graded: boolean;
  id: string;
}

const dummyQuizzes: QuizData[] = [
  { name: "JavaScript Basics", type: "Quiz", grade: 85, graded: true, id: "q1" },
  { name: "React Components", type: "Code", grade: 90, graded: true, id: "q2" },
  { name: "Node.js Overview", type: "Quiz", grade: 78, graded: false, id: "q3" },
  { name: "CSS Styling", type: "Quiz", grade: 92, graded: true, id: "q4" },
  { name: "Data Structures", type: "Code", grade: 88, graded: false, id: "q5" },
];

const QuizzesManagementPage = () => {
  const params = useParams();
  const [quizData, setQuizData] = useState<QuizData[]>(dummyQuizzes); // Start with dummy data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true);
      setError(null);
      try {
        const quizzes = await getStudetnQuizzes(
          params.studentId as string,
          params.courseId as string
        );
        setQuizData(quizzes);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch quizzes. Showing default data.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [params.studentId, params.courseId]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredQuizzes = quizData.filter((quiz) =>
    quiz.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleManageQuizClick = (quiz: QuizData) => {
    console.log("Managing quiz:", quiz);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Head>
        <title>OpenEd - Quizzes Management</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-1 flex flex-col overflow-hidden p-6 bg-white rounded-lg shadow-md mx-6 my-6">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Quizzes</h2>
        </div>

        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search name..."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {loading ? (
          <p>Loading quizzes...</p>
        ) : (
          <>
            {error && <p className="text-red-500">{error}</p>}
            {filteredQuizzes.length > 0 ? (
              <QuizSettingsTable
                data={filteredQuizzes}
                onManageQuizClick={handleManageQuizClick}
              />
            ) : (
              <p>No quizzes found.</p>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default QuizzesManagementPage;
