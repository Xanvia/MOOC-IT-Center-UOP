import React, { useState } from "react";
import { Upload, FileText, Image, Code, X, Check } from "lucide-react";
import { uploadQuizFile } from "@/services/course.service";
import { submitQuiz } from "@/services/course.service";
import { toast } from "sonner";

// Mock SecondaryButton component
interface SecondaryButtonProps {
  text: string;
  onClick: () => void;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ text, onClick }) => (
  <button
    onClick={onClick}
    className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
  >
    {text}
  </button>
);


interface Answer {
  text: string;
  is_correct: boolean;
}

interface Question {
  id: number;
  text: string;
  question_type: string;
  answers: Answer[];
  score: number;
}

interface QuizPreviewProps {
  questions: Question[];
  quizTitle: string;
  quizId: number;
  isCompleted?: boolean;
  setIsFinished: (isFinished: boolean) => void;
}

interface FileUploadAreaProps {
  questionIndex: number;
  selectedFile: string;
  onFileChange: (file: File | null) => void;
  disabled: boolean;
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({ 
  questionIndex, 
  selectedFile, 
  onFileChange, 
  disabled 
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const allowedFileTypes = [
    { type: 'code', extensions: ['py', 'js', 'java', 'cpp', 'c', 'html', 'css'], icon: Code, color: 'text-blue-500' },
    { type: 'pdf', extensions: ['pdf'], icon: FileText, color: 'text-red-500' },
    { type: 'images', extensions: ['png', 'jpg', 'jpeg', 'gif'], icon: Image, color: 'text-green-500' },
    { type: 'documents', extensions: ['doc', 'docx'], icon: FileText, color: 'text-purple-500' }
  ];

  const acceptedExtensions = allowedFileTypes.flatMap(category => 
    category.extensions.map(ext => `.${ext}`)
  ).join(',');

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) return;
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileChange(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileChange(file);
    }
  };

  const removeFile = () => {
    onFileChange(null);
  };

  const getFileIcon = (filename: string) => {
    const extension = filename.split('.').pop()?.toLowerCase() || '';
    const category = allowedFileTypes.find(cat => 
      cat.extensions.includes(extension)
    );
    return category ? category.icon : FileText;
  };

  const getFileColor = (filename: string) => {
    const extension = filename.split('.').pop()?.toLowerCase() || '';
    const category = allowedFileTypes.find(cat => 
      cat.extensions.includes(extension)
    );
    return category ? category.color : 'text-gray-500';
  };

  return (
    <div className="m-5">
      {!selectedFile ? (
        <div
          className={`
            relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
            ${isDragOver 
              ? 'border-indigo-400 bg-indigo-50' 
              : 'border-gray-300 hover:border-gray-400'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !disabled && document.getElementById(`file-input-${questionIndex}`)?.click()}
        >
          <input
            id={`file-input-${questionIndex}`}
            type="file"
            accept={acceptedExtensions}
            onChange={handleFileInputChange}
            className="hidden"
            disabled={disabled}
          />
          
          <div className="flex flex-col items-center space-y-4">
            <div className={`p-4 rounded-full ${isDragOver ? 'bg-indigo-100' : 'bg-gray-100'}`}>
              <Upload className={`w-8 h-8 ${isDragOver ? 'text-indigo-600' : 'text-gray-400'}`} />
            </div>
            
            <div>
              <p className="text-lg font-medium text-gray-700 mb-2">
                {isDragOver ? 'Drop your file here' : 'Upload your file'}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Drag and drop or click to browse
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-md">
              {allowedFileTypes.map((category, idx) => {
                const IconComponent = category.icon;
                return (
                  <div key={idx} className="flex flex-col items-center p-3 bg-white rounded-lg border border-gray-200">
                    <IconComponent className={`w-6 h-6 ${category.color} mb-2`} />
                    <span className="text-xs font-medium text-gray-600 capitalize">{category.type}</span>
                    <span className="text-xs text-gray-400 mt-1">
                      {category.extensions.slice(0, 2).map(ext => `.${ext}`).join(', ')}
                      {category.extensions.length > 2 && '...'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white rounded-lg border border-gray-200">
                {React.createElement(getFileIcon(selectedFile), {
                  className: `w-6 h-6 ${getFileColor(selectedFile)}`
                })}
              </div>
              <div>
                <p className="font-medium text-gray-900">{selectedFile}</p>
                <p className="text-sm text-gray-500">File selected</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="p-1 bg-green-100 rounded-full">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              {!disabled && (
                <button
                  onClick={removeFile}
                  className="p-1 hover:bg-red-100 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-red-500" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const QuizPreview: React.FC<QuizPreviewProps> = ({
  questions,
  quizTitle,
  quizId,
  isCompleted,
  setIsFinished,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string | Set<string>;
  }>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const handleOptionChange = (questionIndex: number, option: string) => {
    setSelectedAnswers((prev) => {
      if (questions[questionIndex].question_type === "SC") {
        return { ...prev, [questionIndex]: option };
      } else if (questions[questionIndex].question_type === "MC") {
        const newSelectedAnswers = new Set(
          (prev[questionIndex] as Set<string>) || []
        );
        if (newSelectedAnswers.has(option)) {
          newSelectedAnswers.delete(option);
        } else {
          newSelectedAnswers.add(option);
        }
        return { ...prev, [questionIndex]: newSelectedAnswers };
      } else {
        return { ...prev, [questionIndex]: option };
      }
    });
  };

  const handleFileChange = async (questionIndex: number, file: File | null) => {
    if (!file) return;

    try {
      const { file_url } = await uploadQuizFile(file);
      setSelectedAnswers((prev) => ({
        ...prev,
        [questionIndex]: file_url,
      }));
    } catch (error) {
      console.error("Error uploading file for question", questionIndex, error);
    }
  };

  const calculateScore = () => {
    let totalScore = 0;
    questions.forEach((question, index) => {
      if (question.question_type !== "OE" && question.question_type !== "FU") {
        const selectedAnswer = selectedAnswers[index];
        if (question.question_type === "SC") {
          const correctAnswer = question.answers.find((a) => a.is_correct);
          if (correctAnswer && selectedAnswer === correctAnswer.text) {
            totalScore += question.score;
          }
        } else if (question.question_type === "MC") {
          const selectedSet = selectedAnswer as Set<string> | undefined;
          const correctAnswers = question.answers.filter((a) => a.is_correct);
          if (
            selectedSet &&
            selectedSet.size === correctAnswers.length &&
            correctAnswers.every((a) => selectedSet.has(a.text))
          ) {
            totalScore += question.score;
          }
        }
      }
    });
    return totalScore;
  };

  const createStudentAnswers = async () => {
    const studentAnswers: {
      [key: number]: string | string[] | { text: string; grade: number };
    } = {};

    for (let index = 0; index < questions.length; index++) {
      const question = questions[index];
      const selectedAnswer = selectedAnswers[index];

      if (question.question_type === "SC" || question.question_type === "OE") {
        if (selectedAnswer !== undefined) {
          if (question.question_type === "OE") {
            studentAnswers[question.id] = {
              text: selectedAnswer as string,
              grade: 0,
            };
          } else {
            studentAnswers[question.id] = selectedAnswer as string;
          }
        }
      } else if (question.question_type === "MC") {
        if (selectedAnswer instanceof Set) {
          studentAnswers[question.id] = Array.from(selectedAnswer);
        } else {
          studentAnswers[question.id] = [];
        }
      } else if (question.question_type === "FU") {
        if (selectedAnswer) {
          studentAnswers[question.id] = selectedAnswer as string;
        }
      }
    }

    return studentAnswers;
  };

  const handleSubmit = async () => {
    const score = calculateScore();
    const studentAnswers = await createStudentAnswers();

    try {
      await submitQuiz(quizId, score, studentAnswers);
      setQuizSubmitted(true);
      setShowResults(true);
      setIsFinished(true);
      toast.success("Quiz Submitted");
    } catch (error) {
      console.error("Failed to submit quiz:", error);
    }
  };

  const getAnswerStyle = (questionIndex: number, answer: Answer) => {
    if (!showResults) return "";

    const isSelected =
      questions[questionIndex].question_type === "SC"
        ? selectedAnswers[questionIndex] === answer.text
        : (selectedAnswers[questionIndex] as Set<string>)?.has(answer.text);

    if (answer.is_correct) {
      return "bg-green-100 border-green-500 text-green-700";
    } else if (isSelected && !answer.is_correct) {
      return "bg-red-100 border-red-500 text-red-700";
    }
    return "";
  };

  // Demo data for preview
  const demoQuestions = questions.length > 0 ? questions : [
    {
      id: 1,
      text: "What is the capital of France?",
      question_type: "SC",
      answers: [
        { text: "London", is_correct: false },
        { text: "Paris", is_correct: true },
        { text: "Berlin", is_correct: false },
        { text: "Madrid", is_correct: false }
      ],
      score: 10
    },
    {
      id: 2,
      text: "Upload your Python solution for the sorting algorithm:",
      question_type: "FU",
      answers: [],
      score: 20
    }
  ];

  return (
    <div className="questions-preview mt-3 shadow-md p-8 bg-white border rounded-md">
      <h2 className="text-2xl font-semibold p-4 mb-6 border-b-2">{quizTitle || "Sample Quiz"}</h2>
      {demoQuestions.map((q, index) => (
        <div key={index} className="question border rounded-md shadow-inner bg-gray-50 mb-6 px-4 py-2">
          <h3 className="text-lg m-2 font-semibold border-b-2">{q.text}</h3>
          {q.question_type === "SC" || q.question_type === "MC" ? (
            <ul className="list-none">
              {q.answers.map((answer, i) => (
                <li key={i} className="ml-8">
                  <label
                    className={`inline-flex px-5 py-1 items-center  ${getAnswerStyle(
                      index,
                      answer
                    )}`}
                  >
                    {q.question_type === "SC" ? (
                      <input
                        type="radio"
                        name={`preview-question-${index}`}
                        value={answer.text}
                        checked={selectedAnswers[index] === answer.text}
                        onChange={() => handleOptionChange(index, answer.text)}
                        className="form-radio text-indigo-600 mr-2"
                        disabled={showResults}
                      />
                    ) : (
                      <input
                        type="checkbox"
                        name={`preview-question-${index}`}
                        value={answer.text}
                        checked={
                          (selectedAnswers[index] as Set<string>)?.has(
                            answer.text
                          ) || false
                        }
                        onChange={() => handleOptionChange(index, answer.text)}
                        className="form-checkbox text-indigo-600 mr-2"
                        disabled={showResults}
                      />
                    )}
                    {answer.text}
                    {showResults && answer.is_correct && (
                      <span className="ml-2 text-green-600">✓</span>
                    )}
                  </label>
                </li>
              ))}
            </ul>
          ) : q.question_type === "OE" ? (
            <div className="m-5">
              <textarea
                name={`preview-question-${index}`}
                value={(selectedAnswers[index] as string) || ""}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                rows={4}
                disabled={showResults}
              />
            </div>
          ) : q.question_type === "FU" ? (
            <FileUploadArea
              questionIndex={index}
              selectedFile={selectedAnswers[index] as string}
              onFileChange={(file: File | null) => handleFileChange(index, file)}
              disabled={showResults}
            />
          ) : null}
          {showResults && q.question_type !== "OE" && q.question_type !== "FU" && (
            <p className="mt-2 font-semibold">
              {q.question_type === "SC"
                ? q.answers.find((ans) => ans.is_correct)?.text ===
                  selectedAnswers[index]
                  ? "Correct!"
                  : "Incorrect!"
                : Array.from(
                    (selectedAnswers[index] as Set<string>) || []
                  ).every((ans) =>
                    q.answers.some(
                      (answer) => answer.is_correct && answer.text === ans
                    )
                  ) &&
                  Array.from((selectedAnswers[index] as Set<string>) || [])
                    .length === q.answers.filter((ans) => ans.is_correct).length
                ? "Correct!"
                : "Incorrect!"}
            </p>
          )}
        </div>
      ))}
      {!isCompleted && !quizSubmitted && (
        <div className="flex p-4 justify-end">
          <SecondaryButton text="Submit" onClick={handleSubmit} />
        </div>
      )}
      {showResults && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h3 className="text-xl font-semibold">Quiz Results</h3>
          <p className="mt-2">Total Score: {calculateScore()}</p>
        </div>
      )}
    </div>
  );
};

export default QuizPreview;
