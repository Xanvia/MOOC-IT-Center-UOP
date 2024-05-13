import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const SolidButton: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      className="bg-primary px-5 min-w-64 hover:bg-primary_test align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-16 rounded-lg bg-accent text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
      type="button"
    >
      {text}
    </button>
  );
};

export default SolidButton;
