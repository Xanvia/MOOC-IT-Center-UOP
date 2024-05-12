import React from "react";

interface ButtonProps {
  text: string;
}

const SecondaryButton: React.FC<ButtonProps> = ({ text }) => {
  return (
    <button
      type="button"
      className="focus:outline-none text-white bg-primary hover:bg-white hover:text-black focus:ring-4 focus:ring-white-300 font-medium rounded-lg text-sm px-6 py-2 me-2 mb-2 dark:focus:ring-white-900 border border-white-800"
    >
      {text}
    </button>
  );
};

export default SecondaryButton;
