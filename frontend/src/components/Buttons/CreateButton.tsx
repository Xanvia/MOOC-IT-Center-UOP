import React from "react";

interface CreateButtonProps {
  text: string;
  onClick: () => void;
}

const CreateButton: React.FC<CreateButtonProps> = ({ text, onClick }) => {
  return (
    <button
      className="flex items-center border rounded border-opacity-100 border-primary py-1 px-2"
      onClick={onClick}
    >
      <h1 className="ps-3 text-xl text-primary font-bold">{text}</h1>
      <svg
        className="w-6 h-6 text-primary ml-2"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 12h14m-7 7V5"
        />
      </svg>
    </button>
  );
};

export default CreateButton;
