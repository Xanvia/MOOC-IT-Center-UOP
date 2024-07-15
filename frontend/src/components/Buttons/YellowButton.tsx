import React from "react";
import { YellowButtonClasses } from "../components.styles";

interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset"; // Add this line
}

const YellowButton: React.FC<ButtonProps> = ({
  text,
  onClick,
  disabled,
  type = "button",
}) => {
  return (
    <button
      className={YellowButtonClasses}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default YellowButton;
