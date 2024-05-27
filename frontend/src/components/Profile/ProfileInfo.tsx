import React from "react";

const ProfileInfo: React.FC = ({}) => {
  return (
    <div className="Box bg-white mt-10 h-full w-full">
      <div className="grid grid-cols-2 gap-4 text-primary text-right mx-20">
        <div>
          <div className="bg-slate-500 h-4 w-4 rounded-full "></div>
        </div>
        <div>
          <h1>johndoes@gmail.com</h1>
        </div>
        <div>
          <div className="bg-slate-500 h-4 w-4 rounded-full "></div>
        </div>
        <div>
          <p>+94-765432121</p>
        </div>
        <div>
          <div className="bg-slate-500 h-4 w-4 rounded-full "></div>
        </div>
        <div>
          <p>2000 - 10 - 12</p>
        </div>
        <div>
          <div className="bg-slate-500 h-4 w-4 rounded-full "></div>
        </div>
        <div>
          <h1>Sri Lanka</h1>
        </div>
      </div>
      <div className=" text-center text-primary mx-10 mt-16">
        <p className="leading-tight text-sm">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur.
        </p>
      </div>
    </div>
  );
};

export default ProfileInfo;
