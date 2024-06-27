"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import SolidButton from "../Buttons/SolidButton";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface Props {
  initialValue?: string;
  onClick: (value: string) => void;
}

const TextEditor: React.FC<Props> = ({ initialValue, onClick }) => {
  const [value, setValue] = useState<string>(initialValue ?? "");

  const handleChange = (content: string, _: any, __: any, editor: any) => {
    setValue(content);
  };

  return (
    <div>
      {ReactQuill && (
        <ReactQuill
          
          value={value}
          onChange={handleChange}
          modules={{
            toolbar: [
              [{ header: "1" }, { header: "2" }, { font: [] }],
              [{ size: [] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              ["clean"],
            ],
          }}
          formats={[
            "header",
            "font",
            "size",
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            "list",
            "bullet",
            "indent",
            "link",
          ]}
        />
      )}
      <div className="flex justify-end mt-8">
        <SolidButton
          type="button"
          text="S A V E"
          onClick={() => onClick(value)}
        />
      </div>
    </div>
  );
};

export default TextEditor;
