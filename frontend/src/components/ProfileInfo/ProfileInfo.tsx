import React from "react";

const ProfileInfo: React.FC = ({}) => {
  return (
    <div className="Box bg-sky-100 relative border-2 py-8 mt-2 h-full w-full">
        <div className="grid grid-cols-2 gap-4 text-primary">
            <div><h1>01</h1></div>
            <div><h1>02</h1></div>
            <div><h1>03</h1></div>
            <div><h1>04</h1></div>
            <div><h1>05</h1></div>
            <div><h1>06</h1></div>
            <div><h1>07</h1></div>
            <div><h1>08</h1></div>
        </div>
        <div className="text text-center text-primary mt-5 ml-5 mr-5">
            <h1>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h1>
        </div>
    </div>
    
  );
};

export default ProfileInfo;


