import React from "react";
import { EditButtonClasses } from "../components.styles";


interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const DeleteButton: React.FC<ButtonProps> = ({
  text,
  onClick,
  disabled,
}) => {
  return (
    <button
      className={EditButtonClasses} // Use the same styles as EditButtonPrimary
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      <div className="flex">
        <svg
          className="lg:w-6 lg:h-5 w-4 h-4 text-red-500 hover:ring-1 hover:ring-red-600" // Use red color for delete
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M3 6h18v2H3V6zm3 4h12v12H6V10z"
            clipRule="evenodd"
          />
        </svg>
        <span className="pt-0.5 pl-2 text-xs lg:text-sm">{text}</span>
      </div>
    </button>
  );
};

export default DeleteButton;
