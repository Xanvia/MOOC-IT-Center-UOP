import React from "react";

const Register: React.FC = () => {
  return (
    <div className="shadow-md overflow-hidden h-full flex flex-row">
      <div className="relative basis-5/12">
        s
        <img
          src="path/to/your/image.jpg" // Replace with your image path
          alt="MOOC Background"
          className="w-full h-full object-cover rounded-lg absolute top-0 left-0"
        />
        <div className="bg-blue-500 text-white px-6 py-4 rounded-lg absolute inset-0 flex items-center justify-center">
          <div>
            <h1>MOOC</h1>
            <span>
              Knowledge at your fingertips. Explore, learn, grow withour
              e-learning platform.
            </span>
          </div>
        </div>
      </div>

      <div className="bg-primary text-white px-6 py-8 basis-7/12">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <span>Sign up and embark on your journey to knowledge today.</span>
        <form>
          <input type="email" placeholder="Email" />
          <br />
          <br />
          <input type="password" placeholder="Password" />
          <br />
          <br />
          <input type="confirm password" placeholder="Confirm Password" />
          <br />
          <br />
          <button type="submit">NEXT</button>
          <br />
          <span className="text-blue-500 hover:text-blue-700">
            Already have an account? <u>Login</u>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Register;
