import React, { useState } from 'react';
import AceEditor from 'react-ace';

// Import language modes and themes
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-r';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github';

const initialCode = `function add(a, b) {
  return a + b;
}

console.log(add(5, 3));`;

const languageOptions = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'c_cpp', label: 'C/C++' },
  { value: 'java', label: 'Java' },
  { value: 'r', label: 'R' },
];

const CodingQ: React.FC = () => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0].value); // Default: JavaScript
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleEditorChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
  };

  const handleRun = () => {
    // Hardcoded output for now
    setOutput('Output is generated here...');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100'}`}>
      <div className="flex-1 p-4">
        <div className="mb-4 flex justify-between items-center">
          {/* Language Selector Dropdown */}
          <select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className={`px-4 py-2 rounded-md ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-white text-black'}`}
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
            className={`px-4 py-2 ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white rounded-md`}
          >
            Toggle Theme
          </button>
        </div>

        {/* AceEditor Component */}
        <div className={`rounded shadow-md overflow-hidden`} style={{ height: 'calc(80% - 120px)' }}>
          <AceEditor
            mode={selectedLanguage}
            theme={isDarkMode ? 'monokai' : 'github'}
            value={code}
            onChange={handleEditorChange}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            width="100%"
            height="1000%"
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
          <button onClick={handleRun} className={`px-4 py-2 ${isDarkMode ? 'bg-green-600' : 'bg-green-500'} text-white rounded-md`}>
            Run
          </button>
        </div>
      </div>

      {/* Output Display */}
      <div className={`flex-1 p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
        <h2 className="text-xl font-bold mb-4">Output</h2>
        <pre className={`p-4 rounded ${isDarkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>{output}</pre>
      </div>
    </div>
  );
};

export default CodingQ;
