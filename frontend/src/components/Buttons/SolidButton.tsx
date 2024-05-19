import React from "react";
import { SolidButtonClasses } from "../components.styles";

interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const SolidButton: React.FC<ButtonProps> = ({ text, onClick, disabled }) => {
  return (
    <button className={SolidButtonClasses} disabled={disabled} type="button">
      {text}
    </button>
  );
};

export default SolidButton;
