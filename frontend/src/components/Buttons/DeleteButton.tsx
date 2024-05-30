import React from "react";
import { DeleteButtonClasses } from "../components.styles";

interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset"; // Add this line
}

const DeleteButton: React.FC<ButtonProps> = ({
  text,
  onClick,
  disabled,
  type = "button",
}) => {
  return (
    <button
      className={DeleteButtonClasses}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default DeleteButton;
