"use client";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import { Trash } from "lucide-react";
import React, { useState } from "react";

const EditForm: React.FC = () => {
  const [language, setLanguage] = useState("");
  const [question, setQuestion] = useState("");
  const [explanation, setExplanation] = useState("");
  const [testCases, setTestCases] = useState([{ input: "", output: "" }]);

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
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Language
        </label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Language</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          {/* Add other languages as needed */}
        </select>
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
              <Trash size={20} /> {/* Adjust size as needed */}
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
