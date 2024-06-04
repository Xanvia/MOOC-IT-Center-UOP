// components/Item.tsx
import React from "react";
import { interestCloseButtonClasses } from "@/components/components.styles";

interface ItemProps {
  label: string;
  onRemove: () => void;
}

const InterestLabel: React.FC<ItemProps> = ({ label, onRemove }) => {
  return (
    <div className="border-2 pl-6 rounded-2xl text-primary hover:shadow-md flex items-center justify-between">
      {label}
      <button
        type="button"
        className={interestCloseButtonClasses}
        data-modal-hide="authentication-modal"
        onClick={onRemove}
      >
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
        <span className="sr-only">Close modal</span>
      </button>
    </div>
  );
};

export default InterestLabel;
