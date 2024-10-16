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
  setIsFinished: (isFinished: boolean) => void;
}

const CreateQuiz: React.FC<Props> = ({ item, permissions, setIsFinished }) => {
  const [questions, setQuestions] = useState<any[]>(item.content.questions);
  const [isEdit, setIsEdit] = useState<boolean>(permissions.canEdit);
  const { userRole } = useGlobal();

  const addQuestion = (question: any) => {
    setQuestions([...questions, question]);
  };

  return (
    <div className="quiz-container">
      {isEdit && <QuizCreator addQuestion={addQuestion} quizId={item.id} />}
      <QuizPreview
        questions={questions}
        quizTitle={item.name}
        isCompleted={item.completed}
        quizId={item.id}
        setIsFinished={setIsFinished}
      />
    </div>
  );
};

export default CreateQuiz;
