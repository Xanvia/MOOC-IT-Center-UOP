import React from "react";

const Register: React.FC = () => {
  return (
    <div className="shadow-md overflow-hidden h-full flex flex-row">
      <div className="relative basis-4/12">
        <div className="bg-blue-500 text-white px-6 py-4 rounded-lg absolute inset-0 flex items-center justify-center">
          <div>
            <h1 className="text-3xl font-bold mb-4">MOOC</h1>
            <span className="font-sans "> Empower your journey. Learn, grow, succeed with us
            </span>
          </div>
        </div>
      </div>

      <div className="bg-primary text-white px-6 py-8 basis-8/12">
        <h1 className="text-2xl font-bold mb-4">Fill Your Details</h1>
        <br/>
        <center>
        <form>
          <div className="grid grid-cols-2 gap-14">
          <div className="w-72">
             <div className="relative w-full min-w-[200px] h-10">
              <input
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                placeholder=" " />
                <label
                className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Username
                </label>
             </div>
            </div>  
            
            <div>
              <input type="First Name" placeholder="First Name" />
            </div>
            <div>
              <input type="Last Name" placeholder="Last Name" />
              
            </div>
            <div>
            <input type="Username" placeholder="username" />
             
            </div>
            <div>
              <input type="email" placeholder="Email" />
              
            </div>
            <div>
              <input type="password" placeholder="Password" />
              
            </div>
            <div>
              <input type="confirm password" placeholder="Confirm Password" />
              
            </div>
          </div>
          <button type="submit" className="text-red-100">NEXT</button>
          <br />
          <br />
          <p> -or- </p>
          <br />
          <button type="submit">Continue with Google</button>
          <br />
          <br />
          <span className="text-blue-500 hover:text-blue-700">
            Already have an account? <u>Login</u>
          </span>
        </form>
        </center>
        
      </div>
    </div>
  );
};

export default Register;
