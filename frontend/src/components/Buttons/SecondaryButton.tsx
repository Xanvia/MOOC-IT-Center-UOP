import React from "react";
import { SecondaryButtonClass } from "../components.styles";

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const SecondaryButton: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button type="button" onClick={onClick} className={SecondaryButtonClass}>
      {text}
    </button>
  );
};

export default SecondaryButton;
