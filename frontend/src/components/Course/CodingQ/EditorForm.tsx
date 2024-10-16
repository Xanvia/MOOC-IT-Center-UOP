import React, { useState, useEffect, useRef } from "react";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import { Trash } from "lucide-react";
import { Item } from "../types";
import { addDetailsCode, addStarterCode } from "@/services/course.service";
import { toast } from "sonner";
import { languageOptions } from "./data";

interface Props {
  item: Item;
  onSave: () => void;
}

interface TestCase {
  stdin: string;
  expected_output: string;
  marks?: string;
}

const EditForm: React.FC<Props> = ({ item, onSave }) => {
  const [language, setLanguage] = useState(item.content?.language || "Select");
  const [gradingMethod, setGradingMethod] = useState(
    item.content?.grading_type || "Select"
  );
  const [question, setQuestion] = useState(item.content?.question || "");
  const [explanation, setExplanation] = useState(
    item.content?.explanation || ""
  );
  const [testCases, setTestCases] = useState<TestCase[]>(() => {
    if (item.content?.test_cases && item.content.test_cases.length > 0) {
      return item.content.test_cases.map((testCase: TestCase) => ({
        stdin: testCase.stdin || "",
        expected_output: testCase.expected_output || "",
        marks: testCase.marks || "",
      }));
    }
    return [{ stdin: "", expected_output: "", marks: "" }];
  });
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isGradingOpen, setIsGradingOpen] = useState(false);
  const [isTimed, setIsTimed] = useState(item.content?.duration != 0 || false);
  const [timeInMinutes, setTimeInMinutes] = useState(
    item.content?.duration || 0
  );
  const languageDropdownRef = useRef<HTMLDivElement | null>(null);
  const gradingDropdownRef = useRef<HTMLDivElement | null>(null);

  const [starterCode, setStarterCode] = useState(
    item.content?.starter_code ||
      languageOptions.find((language) => language === language)?.starter_code
  );

  const handleClickOutside = (event: MouseEvent) => {
    if (
      languageDropdownRef.current &&
      !languageDropdownRef.current.contains(event.target as Node)
    ) {
      setIsLanguageOpen(false);
    }
    if (
      gradingDropdownRef.current &&
      !gradingDropdownRef.current.contains(event.target as Node)
    ) {
      setIsGradingOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const addTestCase = () => {
    setTestCases([...testCases, { stdin: "", expected_output: "", marks: "" }]);
  };

  const handleTestCaseChange = (
    index: number,
    field: "stdin" | "expected_output" | "marks",
    value: string
  ) => {
    const updatedTestCases = [...testCases];
    updatedTestCases[index] = {
      ...updatedTestCases[index],
      [field]: value,
    };
    setTestCases(updatedTestCases);
  };

  const removeTestCase = (index: number) => {
    const updatedTestCases = testCases.filter((_, i) => i !== index);
    setTestCases(updatedTestCases);
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    setStarterCode(
      languageOptions.find((language) => language.display === value)
        ?.starter_code
    );
  };

  const handleSaveClick = async () => {
    try {
      await addDetailsCode(
        item.id,
        question,
        explanation,
        testCases,
        timeInMinutes,
        gradingMethod,
        starterCode,
        language
      );
      onSave();
      toast.success("Question added successfully");
    } catch (err) {
      toast.error("Error adding question");
    }
  };

  const renderDropdown = (
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    options: string[],
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    ref: React.RefObject<HTMLDivElement>,
    label: string
  ) => (
    <div className="mb-4 relative" ref={ref}>
      <span className="text-sm font-semibold text-primary pr-52">{label}</span>
      <div className="relative w-3/4 mt-4">
        <button
          type="button"
          className="w-full cursor-default rounded-md bg-white p-2 pl-3 pr-10 text-left text-primary shadow-sm ring-1 ring-inset ring-primary focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="flex items-center text-primary justify-center">
            <span className="ml-3 block truncate">{value}</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <svg
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>

        {isOpen && (
          <ul
            className="absolute z-10 mt-1 w-full max-h-56 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            tabIndex={-1}
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-option-3"
          >
            {options.map((option, index) => (
              <li
                key={index}
                className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9"
                id={`listbox-option-${index}`}
                role="option"
                aria-selected={value === option}
                onClick={() => {
                  if (label === "Language") {
                    handleLanguageChange(option);
                  } else {
                    setValue(option);
                  }
                  setIsOpen(false);
                }}
              >
                <div className="flex items-center text-primary justify-center">
                  <span className="font-normal ml-3 block truncate">
                    {option}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  return (
    <form className="ml-16">
      <div className="mt-6 flex justify-end">
        <SecondaryButton text="SAVE" onClick={handleSaveClick} />
      </div>
      {renderDropdown(
        language,
        setLanguage,
        ["JavaScript", "Python", "Java", "C", "C++"],
        isLanguageOpen,
        setIsLanguageOpen,
        languageDropdownRef,
        "Language"
      )}

      <div className="flex items-center mb-4">
        {renderDropdown(
          gradingMethod,
          setGradingMethod,
          ["All or None Grading", "Test Case Based Grading"],
          isGradingOpen,
          setIsGradingOpen,
          gradingDropdownRef,
          "Grading Method"
        )}
        <div className="ml-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isTimed}
              onChange={(e) => setIsTimed(e.target.checked)}
              className="form-checkbox h-5 w-5 text-primary"
            />
            <span className="ml-2 text-sm font-semibold text-primary">
              Is Timed
            </span>
          </label>
          {isTimed && (
            <div className="mt-2">
              <input
                type="number"
                value={timeInMinutes}
                onChange={(e) => setTimeInMinutes(parseInt(e.target.value))}
                placeholder="Time in minutes"
                className="p-2 border border-gray-300 rounded-md w-2/3"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex space-x-4 mb-4">
        <div className="flex-1">
          <label htmlFor="question" className="block">
            Question
          </label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex-1">
          <label htmlFor="explanation" className="block">
            Explanation
          </label>
          <textarea
            value={explanation}
            id="explanation"
            onChange={(e) => setExplanation(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Test Cases
        </label>

        {testCases.map((testCase, index) => (
          <div key={index} className="mb-4">
            <div className="flex mb-1">
              <label className="w-1/4 mr-2 text-sm font-medium text-gray-600">
                Input
              </label>
              <label className="w-1/4 mr-2 text-sm font-medium text-gray-600">
                Output
              </label>
              {gradingMethod === "Test Case Based Grading" && (
                <label className="w-1/6 mr-2 text-sm font-medium text-gray-600">
                  Marks
                </label>
              )}
            </div>
            <div className="flex items-center">
              <input
                type="text"
                value={testCase.stdin}
                onChange={(e) =>
                  handleTestCaseChange(index, "stdin", e.target.value)
                }
                placeholder="Input"
                className="mr-2 p-2 border border-gray-300 rounded-md w-1/4"
              />
              <input
                type="text"
                value={testCase.expected_output}
                onChange={(e) =>
                  handleTestCaseChange(index, "expected_output", e.target.value)
                }
                placeholder="Output"
                className="mr-2 p-2 border border-gray-300 rounded-md w-1/4"
              />
              {gradingMethod === "Test Case Based Grading" && (
                <input
                  type="number"
                  value={testCase.marks}
                  onChange={(e) =>
                    handleTestCaseChange(index, "marks", e.target.value)
                  }
                  placeholder="Marks"
                  className="mr-2 p-2 border border-gray-300 rounded-md w-1/6"
                />
              )}
              <button
                type="button"
                onClick={() => removeTestCase(index)}
                className="text-red-500 hover:text-red-700"
                aria-label="Remove test case"
              >
                <Trash size={20} />
              </button>
            </div>
          </div>
        ))}

        <div className="mt-6">
          <SecondaryButton onClick={addTestCase} text="Add Test Case" />
        </div>
      </div>
    </form>
  );
};

export default EditForm;
