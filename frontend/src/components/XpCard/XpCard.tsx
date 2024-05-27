import React from "react";

const XpCard: React.FC = ({}) => {
  return (
    <div>
        <div className="Box bg-white md:rounded-lg md:shadow-md border-2 py-3 h-36 w-full">
          <div className="bg-slate-500 ml-auto mr-3 h-4 w-4 rounded-full ">
            </div>
          <div className="text text-2xl  ml-4">
            <h1> University of Peradeniya</h1>
          </div>
          <div className="text  ml-5">
            <h1> Lecturer</h1>
          </div>
          <div className="text mt-5 ml-5">
            <h1> 2020-10 to 2021-12</h1>
          </div>  
        </div>
        <br />    
    </div>
    
  );
};

export default XpCard;


