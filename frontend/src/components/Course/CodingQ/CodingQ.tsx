import React, { useState } from "react";
import AceEditor from "react-ace";

// Import language modes and themes
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-r";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";

const initialCode = `function add(a, b) {
  return a + b;
}

console.log(add(5, 3));`;

const languageOptions = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "c_cpp", label: "C/C++" },
  { value: "java", label: "Java" },
  { value: "r", label: "R" },
];

const hardcodedTestResults = [
  { id: 1, name: "Test Case 1", status: "passed" },
  { id: 2, name: "Test Case 2", status: "failed" },
  { id: 3, name: "Test Case 3", status: "passed" },
];

const CodingQ: React.FC = () => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [testResults, setTestResults] = useState<
    { id: number; name: string; status: string }[]
  >([]);
  const [selectedLanguage, setSelectedLanguage] = useState(
    languageOptions[0].value
  ); // Default: JavaScript
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleEditorChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedLanguage(event.target.value);
  };

  const handleRun = () => {
    // Hardcoded output for now
    setOutput("Output is generated here...");
  };

  const handleSubmit = () => {
    // Set hardcoded test results for now
    setTestResults(hardcodedTestResults);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const passedTests = testResults.filter(
    (test) => test.status === "passed"
  ).length;
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
        <div className="mb-4 flex justify-between items-center">
          {/* Language Selector Dropdown */}
          <select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className={`px-4 py-2 rounded-md ${
              isDarkMode ? "bg-gray-600 text-white" : "bg-white text-black"
            }`}
          >
            {languageOptions.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>

          {/* Toggle Theme Button */}
          <button
            onClick={toggleTheme}
            className={`px-4 py-2 ${
              isDarkMode ? "bg-blue-600" : "bg-blue-500"
            } text-white rounded-md`}
          >
            Toggle Theme
          </button>
        </div>

        {/* AceEditor Component */}
        <div
          className={`rounded shadow-md overflow-hidden`}
          style={{ height: "calc(100% - 120px)" }}
        >
          <AceEditor
            mode={selectedLanguage}
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
        <div className="mt-4 space-x-4">
          <button
            onClick={handleRun}
            className={`px-4 py-2 ${
              isDarkMode ? "bg-green-600" : "bg-green-500"
            } text-white rounded-md`}
          >
            Run
          </button>
          <button
            onClick={handleSubmit}
            className={`px-4 py-2 ${
              isDarkMode ? "bg-blue-600" : "bg-blue-500"
            } text-white rounded-md`}
          >
            Submit
          </button>
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

export default CodingQ;
