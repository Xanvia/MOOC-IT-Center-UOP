import React from "react";
import { SolidButtonClasses } from "../components.styles";

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const SolidButton: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button className={SolidButtonClasses} type="button">
      {text}
    </button>
  );
};

export default SolidButton;
