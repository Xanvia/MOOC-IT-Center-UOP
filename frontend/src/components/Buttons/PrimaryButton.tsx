// PrimaryButton.tsx
import React from "react";
import { PrimaryButtonClass } from "../components.styles";

interface PrimaryButtonProps {
  text: string;
  onClick: () => void; // Add this line
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ text, onClick }) => {
  return (
    <button type="button" onClick={onClick} className={PrimaryButtonClass}>
      {text}
    </button>
  );
};

export default PrimaryButton;
