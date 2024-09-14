// CreateQuiz.tsx
"use client";
import React, { useState } from "react";
import QuizCreator from "./QuizCreator";
import QuizPreview from "./QuizPreview";
import { Item } from "../types";

interface Props {
  item: Item;
}

const CreateQuiz: React.FC<Props> = ({ item }) => {
  const [questions, setQuestions] = useState<any[]>(item.content.questions);
  const isEdit = true;

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
