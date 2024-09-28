import React, { useState, useEffect, useRef } from "react";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import { Trash } from "lucide-react";

const EditForm: React.FC = () => {
  const [language, setLanguage] = useState("Select");
  const [question, setQuestion] = useState("");
  const [explanation, setExplanation] = useState("");
  const [testCases, setTestCases] = useState([{ input: "", output: "" }]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const addTestCase = () => {
    setTestCases([...testCases, { input: "", output: "" }]);
  };

  const handleTestCaseChange = (
    index: number,
    field: "input" | "output",
    value: string
  ) => {
    const updatedTestCases = [...testCases];
    updatedTestCases[index][field] = value;
    setTestCases(updatedTestCases);
  };

  const removeTestCase = (index: number) => {
    const updatedTestCases = testCases.filter((_, i) => i !== index);
    setTestCases(updatedTestCases);
  };

  return (
    <form className="ml-16">
      <div className="mb-4 relative" ref={dropdownRef}>
        <span className="text-sm font-semibold text-primary pr-52">
          Language
        </span>
        <div className="relative w-1/2 mt-4">
          <button
            type="button"
            className="w-full cursor-default rounded-md bg-white p-2 pl-3 pr-10 text-left text-primary shadow-sm ring-1 ring-inset ring-primary focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
            aria-haspopup="listbox"
            aria-expanded="true"
            aria-labelledby="listbox-label"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="flex items-center text-primary justify-center">
              <span className="ml-3 block truncate">{language}</span>
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
              {["JavaScript", "Python", "Java"].map((lang, index) => (
                <li
                  key={index}
                  className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9"
                  id={`listbox-option-${index}`}
                  role="option"
                  aria-selected={language === lang}
                  onClick={() => {
                    setLanguage(lang);
                    setIsOpen(false);
                  }}
                >
                  <div className="flex items-center text-primary justify-center">
                    <span className="font-normal ml-3 block truncate">
                      {lang}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Question
        </label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Explanation
        </label>
        <textarea
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Test Cases
        </label>
        {testCases.map((testCase, index) => (
          <div key={index} className="flex mb-2 items-center">
            <input
              type="text"
              value={testCase.input}
              onChange={(e) =>
                handleTestCaseChange(index, "input", e.target.value)
              }
              placeholder="Input"
              className="mr-2 p-2 border border-gray-300 rounded-md w-1/4"
            />
            <input
              type="text"
              value={testCase.output}
              onChange={(e) =>
                handleTestCaseChange(index, "output", e.target.value)
              }
              placeholder="Output"
              className="mr-2 p-2 border border-gray-300 rounded-md w-1/4"
            />
            <button
              type="button"
              onClick={() => removeTestCase(index)}
              className="text-red-500 hover:text-red-700"
              aria-label="Remove test case"
            >
              <Trash size={20} />
            </button>
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
