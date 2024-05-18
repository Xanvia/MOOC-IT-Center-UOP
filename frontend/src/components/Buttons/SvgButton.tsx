import React from "react";
import { SvgButtonClasses } from "../components.styles";

interface ButtonProps {
  text: string;
  onClick: () => void;
  svg?: React.ReactNode;
}

const SvgButton: React.FC<ButtonProps> = ({ text, onClick, svg }) => {
  return (
    <button className={SvgButtonClasses} type="button" onClick={onClick}>
      <div className="flex pl-2">
        {svg}
        <span className="pt-1 pl-2">{text}</span>
      </div>
    </button>
  );
};

export default SvgButton;
