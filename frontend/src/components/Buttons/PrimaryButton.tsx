// PrimaryButton.tsx
import React from "react";

interface PrimaryButtonProps {
  text: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ text }) => {
  return (
    <button
      type="button"
      className="focus:outline-none text-black bg-button_yellow hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
