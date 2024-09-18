// CreateQuiz.tsx
"use client";
import React, { useState } from "react";
import QuizCreator from "./QuizCreator";
import QuizPreview from "./QuizPreview";
import { Item } from "../types";
import { useGlobal } from "@/contexts/store";

interface Props {
  item: Item;
}

const CreateQuiz: React.FC<Props> = ({ item }) => {
  const [questions, setQuestions] = useState<any[]>(item.content.questions);
  const isEdit = true;
  const { userRole } = useGlobal();

  const addQuestion = (question: any) => {
    setQuestions([...questions, question]);
  };

  return (
    <div className="quiz-container">
      {isEdit && userRole === "teacher" && <QuizCreator addQuestion={addQuestion} quizId={item.id} />}
      <QuizPreview questions={questions} quizTitle={item.name} />
    </div>
  );
};

export default CreateQuiz;
