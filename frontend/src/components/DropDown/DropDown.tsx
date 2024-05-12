import React, { useState } from "react";

const DropDown = () => {
    return (
      <div className="px-9">
        <h3>I am a</h3>
            <select>
                <option value="option1">Student</option>
                <option value="option2">Teacher</option>
            </select>
      </div>
    );
  };
  

export default DropDown;