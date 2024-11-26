import React, { useState } from "react";
import AceEditor from "react-ace";
import { runCode, submitCode } from "@/services/code.service";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import { toast } from "sonner";
import { addStarterCode, saveCode } from "@/services/course.service";
import { languageData, languageOptions } from "./data";
import { Plus, Trash2, Save } from "lucide-react";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-r";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import { set } from "jodit/types/core/helpers";
import test from "node:test";

interface TestCase {
  stdin: string;
  expected_output: string;
}

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
  initialCode: string;
  canEdit: boolean;
  language: string;
  codeID: number;
  testCases: TestCase[];
  userRole: string;
  setIsFinished: (isFinished: boolean) => void;
}

const CodeEditor: React.FC<Props> = ({
  initialCode,
  canEdit,
  language,
  codeID,
  testCases,
  userRole,
  setIsFinished,
}) => {
  const [code, setCode] = useState<string>(initialCode || "");
  const [output, setOutput] = useState<string>("");
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [inputs, setInputs] = useState<string[]>([""]);
  const [savedTestCases, setSavedTestCases] = useState<TestCase[]>(
    testCases || []
  );

  const handleEditorChange = (newCode: string) => {
    setCode(newCode);
  };

  const addInputField = () => {
    setInputs([...inputs, ""]);
  };

  const updateInput = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const removeInput = (index: number) => {
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs);
  };

  const handleRun = async () => {
    try {
      if (code) {
        const result = await runCode(
          code,
          inputs.join("\n"),
          languageData.find((lang) => lang.name === language)?.id || 0
        );
        if (!result.stdout) {
          if (result.compile_output) {
            setOutput(result.stderr + "\n" + result.compile_output);
          } else {
            setOutput(result.stderr);
          }
        } else {
          setOutput(result.stdout);
        }
      }
    } catch (err) {
      toast.error("Error running code");
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
  const handleSubmit = async () => {
    try {
      if (code) {
        const results = await submitCode(
          code,
          savedTestCases,
          languageData.find((lang) => lang.name === language)?.id || 0
        );
        setOutput(results.map((result) => result.actual_output).join("\n"));
        setTestResults(results);
        if (userRole == "student") {
          const grade = getGrade();
          await saveCode(codeID, code || "", grade, results);
          setIsFinished(true);
          toast.success("Code submitted successfully");
        }
      }
    } catch (err: any) {
      toast.error(err);
    }
  };

  const saveAsTestCase = async () => {
    if (!output) {
      toast.error("Please run the code first to generate output");
      return;
    }

    const newTestCase: TestCase = {
      stdin: inputs.join("\n"),
      expected_output: output,
    };
    const newTestCases = [...savedTestCases, newTestCase];
    try {
      await addStarterCode(codeID, code || "", newTestCases);
      console.log(newTestCases, "New Test Cases");
      setSavedTestCases(newTestCases);
      toast.success("Test case saved successfully");
    } catch (error) {
      toast.error("Error saving test case");
    }
  };

  const deleteTestCase = async (index: number) => {
    const newTestCases = savedTestCases.filter((_, i) => i !== index);
    try {
      await addStarterCode(codeID, code || "", newTestCases);
      setSavedTestCases(newTestCases);
    } catch (err) {
      toast.error("Error deleting test case");
    }
  };

  const handleSaveClick = async () => {
    try {
      await addStarterCode(codeID, code || "", testCases);
      toast.success("Code saved successfully");
    } catch (err) {
      toast.error("Error saving code");
    }
  };

  return (
    <div className="flex m-4 h-[600px] bg-gray-200 rounded-lg">
      <div className="basis-4/6 p-4">
        <div className="rounded-lg shadow-md overflow-hidden h-[calc(115%-90px)]">
          <AceEditor
            mode={language?.toLowerCase()}
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
      </div>

      <div className="basis-2/6 m-8 bg-gray-100 rounded-lg overflow-y-auto">
        {/* Input Section */}
        <div className="bg-gray-100 mb-3 px-4 pt-4 rounded-lg">
          <div className="mb-6">
            <div className="flex items-center pb-2 justify-between mb-2 border-b-2">
              <h2 className="text-xl font-bold">Inputs</h2>
              <button
                onClick={addInputField}
                className="p-2 bg-primary text-white rounded-full hover:bg-blue-800 duration-300"
              >
                <Plus size={14} />
              </button>
            </div>

            {inputs.map((input, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => updateInput(index, e.target.value)}
                  className="flex-1 p-2 border rounded shadow-inner"
                  placeholder={`Input ${index + 1}`}
                />
                {inputs.length > 1 && (
                  <button
                    onClick={() => removeInput(index)}
                    className="p-2 text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Buttons Section */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={handleRun}
              className="px-6 py-2 me-2 mb-2 bg-primary font-medium text-sm text-white rounded-lg hover:bg-blue-900  duration-300"
            >
              Run
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 me-2 mb-2 bg-primary font-medium text-sm text-white rounded-lg hover:bg-blue-900 duration-300"
            >
              Submit
            </button>
            {canEdit && (
              <SecondaryButton text="Save" onClick={handleSaveClick} />
            )}
          </div>
        </div>
        {/* Output Section */}
        <div className="mb-6 p-4">
          <h2 className="text-xl font-bold pb-2 mb-2 border-b-2">Output</h2>
          <pre className="p-4 bg-white rounded shadow-inner">{output}</pre>
        </div>

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

        {/* Teacher Mode - Test Cases Section */}
        {userRole === "teacher" && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold mb-2 p-4">Test Cases</h2>
              {output && (
                <button
                  onClick={saveAsTestCase}
                  className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  <Save size={16} />
                  Save as Test Case
                </button>
              )}
            </div>

            <div className="space-y-2 ">
              {savedTestCases.map((testCase, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start p-3 bg-gray-50 rounded"
                >
                  <div>
                    <p className="font-semibold">Input:</p>
                    <pre className="text-sm">{testCase.stdin}</pre>
                    <p className="font-semibold mt-2">Expected Output:</p>
                    <pre className="text-sm">{testCase.expected_output}</pre>
                  </div>
                  <button
                    onClick={() => deleteTestCase(index)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;
