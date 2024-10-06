import axios from "axios";

interface TestResult {
    input: string;
    expected_output: string;
    actual_output: string;
    passed: boolean;
    id: number; // Optionally, you can add an ID or any other property
    status: "passed" | "failed"; // Additional status field to differentiate result states
    name: string; // Optional: use to name each test case if needed
}

// Create a new Axios instance for the Judge server
const judgeInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_JUDGE, // Ensure this is set in your environment variables
  headers: {
    'X-Auth-Token': 'gkZVv9fO8Q3lV9xJYFf3OQeGkZj2Vt2uQ1L5kWq3xPc='
  }
});

// Function to run code against the judge server
interface RunCodeRequest {
    source_code: string;
    language_id: number;
    stdin: string;
  }
  
  export const runCode = async (code: string, input: string, languageId: number) => {
    const requestBody: RunCodeRequest = {
      source_code: code,
      language_id: languageId,
      stdin: input,
    };
  
    try {
      const response = await judgeInstance.post(
        "/submissions?base64_encoded=false&wait=true",
        requestBody
      );
      return response.data; // Return stdout or other relevant information
    } catch (error: any) {
      console.error(error.response?.data);
      throw new Error(error.response?.data.message ?? "Error running code");
    }
  };
  
// Function to submit code with test cases
export const submitCode = async (
    code: string,
    testCases: { stdin: string; expected_output: string }[],
    language_id:number
  ): Promise<TestResult[]> => {
    const results: TestResult[] = [];
  
    try {
      // Use a regular `for` loop to avoid the IterableIterator error
      for (let index = 0; index < testCases.length; index++) {
        const testCase = testCases[index];
        const response = await runCode(code, testCase.stdin,language_id);
        const passed = response.stdout.trim() === testCase.expected_output;

  
        results.push({
          input: testCase.stdin,
          expected_output: testCase.expected_output,
          actual_output: response.stdout, // Assuming the judge server returns 'stdout'
          passed,
          id: index, // Use the index as a unique ID
          status: passed ? "passed" : "failed",
          name: `Test Case ${index + 1}`,
        });
      }
  
      return results;
    } catch (error: any) {
      throw new Error(error.response?.data.message ?? "Error submitting code");
    }
  };