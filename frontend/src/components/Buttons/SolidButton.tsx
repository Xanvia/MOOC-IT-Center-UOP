import React from "react";
import { SolidButtonClasses } from "../components.styles";

interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset"; // Add this line
}

const SolidButton: React.FC<ButtonProps> = ({ text, onClick, disabled, type = "button" }) => {
  return (
    <button className={SolidButtonClasses} disabled={disabled} type={type}>
      {text}
    </button>
  );
};

export default SolidButton;