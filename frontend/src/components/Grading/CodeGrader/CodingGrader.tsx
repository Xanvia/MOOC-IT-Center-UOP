"use client";
import React, { useState } from "react";
import AceEditor from "react-ace";

interface TestCase {
  stdin: string;
  expected_output: string;
  actual_output: string;
  passed: boolean;
}

interface CodingSubmission {
  question: string;
  studentCode: string;
  testCases: TestCase[];
  autoGrade: number;
}

interface CodingGraderProps {
  codingData: CodingSubmission;
  courseId: string;
}

const CodingGrader: React.FC<CodingGraderProps> = ({ codingData }) => {
  const [approvedGrade, setApprovedGrade] = useState<number>(
    codingData?.autoGrade
  );
  const [isGradeApproved, setIsGradeApproved] = useState(false);

  const handleGradeApproval = () => {
    setIsGradeApproved(true);
    // Here you would typically make an API call to save the approved grade
    console.log("Grade approved:", approvedGrade);
  };

  const passedTests = codingData.testCases.filter((test) => test.passed).length;
  const totalTests = codingData.testCases.length;
  const scorePercentage = ((passedTests / totalTests) * 100).toFixed(2);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4">{codingData.question}</h2>

        {/* Student's Code Display */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">
            Student&apos;s Solution
          </h3>
          <div className="h-[300px] border rounded">
            <AceEditor
              mode="javascript"
              theme="github"
              value={codingData.studentCode}
              readOnly={true}
              width="100%"
              height="100%"
              fontSize={14}
              showPrintMargin={false}
              setOptions={{
                showLineNumbers: true,
                tabSize: 2,
              }}
            />
          </div>
        </div>

        {/* Test Cases Results */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Test Cases</h3>
          <div className="space-y-3">
            {codingData.testCases.map((testCase, index) => (
              <div key={index} className="border rounded p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">Input:</p>
                    <pre className="bg-gray-50 p-2 rounded mt-1">
                      {testCase.stdin}
                    </pre>
                  </div>
                  <div>
                    <p className="font-medium">Expected Output:</p>
                    <pre className="bg-gray-50 p-2 rounded mt-1">
                      {testCase.expected_output}
                    </pre>
                  </div>
                  <div>
                    <p className="font-medium">Actual Output:</p>
                    <pre className="bg-gray-50 p-2 rounded mt-1">
                      {testCase.actual_output}
                    </pre>
                  </div>
                  <div className="flex items-center">
                    <span
                      className={`px-3 py-1 rounded ${
                        testCase.passed
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {testCase.passed ? "Passed" : "Failed"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Auto-generated Grade */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Auto-generated Grade</h3>
          <p className="text-xl">
            {passedTests} out of {totalTests} tests passed ({scorePercentage}%)
          </p>
          <p className="mt-2">Calculated Grade: {codingData.autoGrade}/100</p>
        </div>

        {/* Grade Approval */}
        <div className="mt-6 flex items-center gap-4">
          <input
            type="number"
            value={approvedGrade}
            onChange={(e) => setApprovedGrade(Number(e.target.value))}
            className="border rounded px-3 py-2 w-24"
            min="0"
            max="100"
            disabled={isGradeApproved}
          />
          <button
            onClick={handleGradeApproval}
            disabled={isGradeApproved}
            className={`px-4 py-2 rounded ${
              isGradeApproved
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {isGradeApproved ? "Grade Approved" : "Approve Grade"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodingGrader;
