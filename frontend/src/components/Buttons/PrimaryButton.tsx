// PrimaryButton.tsx
import React from "react";


interface PrimaryButtonProps {
  text: string;
  onClick: () => void; // Add this line
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ text, onClick }) => { 
  return (
    <button
      type="button"
      className="focus:outline-none text-black font-times bg-white hover:bg-primary hover:ring-1 hover:text-white hover:ring-white focus:ring-4 focus:ring-primary_test font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 dark:focus:ring-white"
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
