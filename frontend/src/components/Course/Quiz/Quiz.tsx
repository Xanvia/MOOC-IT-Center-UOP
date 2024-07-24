// CreateQuiz.tsx
"use client";
import React, { useState } from "react";
import QuizCreator from "./QuizCreator";
import QuizPreview from "./QuizPreview";

const CreateQuiz: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const isEdit = true;  

  const addQuestion = (question: any) => {
    setQuestions([...questions, question]);
  };

  return (
    <div className="quiz-container">
      {isEdit && <QuizCreator addQuestion={addQuestion} />}
      <QuizPreview questions={questions} />
    </div>
  );
};

export default CreateQuiz;
