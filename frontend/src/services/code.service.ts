import axios from "axios";

// Create a new Axios instance for the Judge server
const judgeInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_JUDGE, // Ensure this is set in your environment variables
});

// Function to run code against the judge server
export const runCode = async (code: string, input: string) => {
  try {
    const response = await judgeInstance.post("/run", { code, input });
    return response.data; // Return stdout or other relevant information
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Error running code");
  }
};

// Function to submit code with test cases
export const submitCode = async (
  code: string,
  testCases: { stdin: string; expected_output: string }[]
) => {
  const results = [];

  try {
    // Iterate over each test case and get the result
    for (const testCase of testCases) {
      const response = await runCode(code, testCase.stdin);
      results.push({
        input: testCase.stdin,
        expected_output: testCase.expected_output,
        actual_output: response.stdout, // Assuming the judge server returns 'stdout'
        passed: response.stdout === testCase.expected_output,
      });
    }

    return results;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? "Error submitting code");
  }
};


