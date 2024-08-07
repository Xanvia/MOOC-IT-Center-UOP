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
  const [questions, setQuestions] = useState<any[]>([]);
  const isEdit = true;

  const addQuestion = (question: any) => {
    setQuestions([...questions, question]);
  };

  return (
    <div className="quiz-container">
      {isEdit && <QuizCreator addQuestion={addQuestion} />}
      <QuizPreview questions={questions} quizTitle={item.name} isEdit={isEdit}/>
    </div>
  );
};

export default CreateQuiz;
