import React, { useState } from "react";
import AceEditor from "react-ace";
import { runCode, submitCode } from "@/services/code.service";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import { toast } from "sonner";
import { addStarterCode, saveCode } from "@/services/course.service";
import { languageOptions } from "./data";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-r";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";

const languageData = [
  { id: 46, name: "Bash (5.0.0)" },
  { id: 71, name: "Python" },
  { id: 63, name: "JavaScript" },
  { id: 62, name: "Java" },
  { id: 80, name: "R" },
  { id: 75, name: "C" },
  { id: 76, name: "C++" },
];

// Define the TestResult interface within this file or import it if it's defined elsewhere
interface TestResult {
  input: string;
  expected_output: string;
  actual_output: string;
  passed: boolean;
  id: number;
  status: "passed" | "failed";
  name: string;
}

interface Props {
  codeID: number;
  initialCode?: string;
  canEdit?: boolean;
  language: string;
  testCases: { stdin: string; expected_output: string }[];
  userRole: string;
}

const CodeEditor: React.FC<Props> = ({
  initialCode,
  canEdit,
  language,
  codeID,
  testCases,
  userRole,
}) => {
  const [code, setCode] = useState(
    initialCode ||
      languageOptions.find((language) => language === language)?.starter_code
  );
  const [output, setOutput] = useState("");
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleEditorChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleRun = async () => {
    try {
      if (code) {
        const result = await runCode(
          code,
          "",
          languageData.find((lang) => lang.name === language)?.id || 0
        );
        if (!result.stdout) {
          setOutput(result.stderr);
        } else {
          setOutput(result.stdout);
        }
      }
    } catch (err) {
      toast.error("Error running code");
    }
  };

  const handleSubmit = async () => {
    try {
      if (code) {
        const results = await submitCode(
          code,
          testCases,
          languageData.find((lang) => lang.name === language)?.id || 0
        );
        setOutput(results.map((result) => result.actual_output).join("\n"));
        setTestResults(results);
        if (userRole == "student") {
          const grade = getGrade();
          await saveCode(codeID, code || "", grade);
        }
      }
    } catch (err) {
      toast.error("Error submitting code");
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSaveClick = async () => {
    try {
      await addStarterCode(codeID, code || "");
      toast.success("Code Saved Successfully");
    } catch (err) {
      toast.error("Error adding question");
    }
  };

  const getGrade = () => {
    let grade = 0;
    testResults.map((result) => {
      if (result.passed) {
        grade++;
      }
    });
    return grade;
  };

  const passedTests = testResults.filter((test) => test.passed).length;
  const totalTests = testResults.length;
  const scorePercentage =
    totalTests > 0 ? ((passedTests / totalTests) * 100).toFixed(2) : "0";

  return (
    <div
      className={`flex h-[600px] ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100"
      }`}
    >
      <div className="flex-1 p-4">
        {/* Theme Toggle Button */}
        {/* <button
          onClick={toggleTheme}
          className={`px-4 py-2 ${
            isDarkMode ? "bg-blue-600" : "bg-blue-500"
          } text-white rounded-md`}
        >
          Toggle Theme
        </button> */}

        {/* AceEditor Component */}
        <div
          className={`rounded shadow-md overflow-hidden`}
          style={{ height: "calc(100% - 90px)" }}
        >
          <AceEditor
            mode={
              languageOptions.find((lang) => lang.display === language)?.value
            }
            theme={isDarkMode ? "monokai" : "github"}
            value={code}
            onChange={handleEditorChange}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            width="100%"
            height="100%"
            fontSize={16}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
            }}
          />
        </div>

        {/* Run and Submit Buttons */}
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            onClick={handleRun}
            className={`px-4 py-2 ${
              isDarkMode ? "bg-green-600" : "bg-green-500"
            } text-white rounded-md hover:opacity-90 transition-opacity flex items-center gap-2`}
          >
            <span>Run</span>
          </button>

          <button
            onClick={handleSubmit}
            className={`px-4 py-2 ${
              isDarkMode ? "bg-blue-600" : "bg-blue-500"
            } text-white rounded-md hover:opacity-90 transition-opacity flex items-center gap-2`}
          >
            <span>Submit</span>
          </button>

          {canEdit && <SecondaryButton text="SAVE" onClick={handleSaveClick} />}
        </div>
      </div>

      {/* Output and Test Results Display */}
      <div className={`flex-1 p-4 ${isDarkMode ? "bg-gray-700" : "bg-white"}`}>
        <h2 className="text-xl font-bold mb-4">Output</h2>
        <pre
          className={`p-4 rounded ${
            isDarkMode ? "bg-gray-600" : "bg-gray-100"
          }`}
        >
          {output}
        </pre>

        {/* Display Test Results */}
        {testResults.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-2">Test Results</h2>
            <ul>
              {testResults.map((result) => (
                <li
                  key={result.id}
                  className={`px-2 mb-2 rounded-md border-2 flex items-center ${
                    result.status === "passed"
                      ? "border-green-500 bg-green-100 text-green-800"
                      : "border-red-500 bg-red-100 text-red-800"
                  }`}
                >
                  <span className="flex-1">{result.name}</span>
                  {/* Status Icon */}
                  {result.status === "passed" ? (
                    <span className="text-green-600 font-bold">&#10003;</span> // Checkmark icon
                  ) : (
                    <span className="text-red-600 font-bold text-xs">
                      &#10060;
                    </span> // Cross icon
                  )}
                </li>
              ))}
            </ul>

            {/* Display Final Score */}
            <div className="mt-4 p-4 rounded-md bg-blue-100 text-blue-800 border-2 border-blue-500">
              <h3 className="text-lg font-bold">Total Score</h3>
              <p className="text-xl">{`${passedTests} out of ${totalTests} test cases passed (${scorePercentage}%)`}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;
