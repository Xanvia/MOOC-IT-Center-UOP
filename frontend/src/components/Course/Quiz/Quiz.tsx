// CreateQuiz.tsx
"use client";
import React, { useState } from "react";
import QuizCreator from "./QuizCreator";
import QuizPreview from "./QuizPreview";
import { Item, Permissions } from "../types";
import { useGlobal } from "@/contexts/store";

interface Props {
  item: Item;
  permissions: Permissions;
}

const CreateQuiz: React.FC<Props> = ({ item, permissions }) => {
  const [questions, setQuestions] = useState<any[]>(item.content.questions);
  const [isEdit, setIsEdit] = useState<boolean>(permissions.canEdit);
  const { userRole } = useGlobal();

  const addQuestion = (question: any) => {
    setQuestions([...questions, question]);
  };
  

  return (
    <div className="quiz-container">
      {isEdit && <QuizCreator addQuestion={addQuestion} quizId={item.id} />}
      <QuizPreview questions={questions} quizTitle={item.name} />
    </div>
  );
};

export default CreateQuiz;
