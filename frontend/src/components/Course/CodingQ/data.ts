export const languageOptions = [
  {
    display: "JavaScript",
    value: "javascript",
    starter_code: `
  // Define your function here
  function functionName(parameters) {
      // Implement your logic here.
      // This function should take input parameters and process them,
      // returning the desired output.
  }
  
  // The main function handles reading input and outputting the result.
  function main() {
      // Read input from stdin (for Judge0 execution).
      const input = require('fs').readFileSync(0, 'utf8').trim().split(" ");
  
      // Convert input as necessary, for example:
      // const a = parseInt(input[0]); // First number
      // const b = parseInt(input[1]); // Second number
  
      // Call your function and print the result.
      const result = functionName(...input);
      console.log(result); // Output the result to stdout
  }
  
  // Call the main function.
  main();
  `,
  },
  {
    display: "Python",
    value: "python",
    starter_code: `
  def function_name(parameters):
      """
      Implement your logic here.
      This function should take the input parameters, process them,
      and return the desired output.
      """
      pass  # Replace this with your logic
  
  def main():
      # Read input from stdin (for Judge0 execution).
      import sys
      input_data = sys.stdin.read().strip().split()
  
      # Convert input data as needed
      # For example, if you're expecting two integers:
      # a = int(input_data[0])  # First number
      # b = int(input_data[1])  # Second number
  
      # Call your function and store the result
      # result = function_name(a, b)
      
      # Output the result to stdout
      # print(result)  # This will be captured as the program's output
  
  if __name__ == '__main__':
      main()
  `,
  },
  {
    display: "Java",
    value: "java",
    starter_code: `
  import java.util.Scanner;
  
  public class Solution {
      // Define your function here
      public static int functionName(int a, int b) {
          // Implement your logic here
          // This function should take input parameters and process them,
          // returning the desired output.
          return 0; // Replace this with your logic
      }
  
      public static void main(String[] args) {
          // Read input from stdin (for Judge0 execution).
          Scanner scanner = new Scanner(System.in);
          String input = scanner.nextLine().trim();
          String[] parts = input.split(" ");
  
          // Convert input as necessary
          int a = Integer.parseInt(parts[0]); // First number
          int b = Integer.parseInt(parts[1]); // Second number
  
          // Call your function and print the result
          int result = functionName(a, b);
          System.out.println(result); // Output the result to stdout
      }
  }
  `,
  },
  {
    display: "C",
    value: "c_cpp",
    starter_code: `
  #include <stdio.h>
  
  // Define your function here
  int function_name(int a, int b) {
      // Implement your logic here
      // This function should take input parameters and process them,
      // returning the desired output.
      return 0; // Replace this with your logic
  }
  
  int main() {
      // Read input from stdin (for Judge0 execution).
      int a, b;
      scanf("%d %d", &a, &b); // Read two integers from stdin
  
      // Call your function and print the result
      int result = function_name(a, b);
      printf("%d\\n", result); // Output the result to stdout
      return 0;
  }
  `,
  },
  {
    display: "C++",
    value: "c_cpp",
    starter_code: `
  #include <iostream>
  using namespace std;
  
  // Define your function here
  int function_name(int a, int b) {
      // Implement your logic here
      // This function should take input parameters and process them,
      // returning the desired output.
      return 0; // Replace this with your logic
  }
  
  int main() {
      // Read input from stdin (for Judge0 execution).
      int a, b;
      cin >> a >> b; // Read two integers from stdin
  
      // Call your function and print the result
      int result = function_name(a, b);
      cout << result << endl; // Output the result to stdout
      return 0;
  }
  `,
  },
];
