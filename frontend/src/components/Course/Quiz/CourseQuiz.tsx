import React from "react";
import CreateQuiz from "./CreateQuiz";
import Quiz from "./Quiz";
interface QuizProps {}

const CourseQuiz: React.FC<QuizProps> = () => {
  const isEdit = true;
  return (
    <>
      {isEdit ? <CreateQuiz /> : null}
      <Quiz />
    </>
  );
};

export default CourseQuiz;
