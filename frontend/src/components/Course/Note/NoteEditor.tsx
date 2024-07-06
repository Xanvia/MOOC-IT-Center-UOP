import React, { useState } from "react";
import JoditReact from "jodit-react-ts";
import "jodit/es5/jodit.min.css";

interface NoteEditorProps {
  initialData: string;
}

const NoteEditor = ({ initialData }: NoteEditorProps) => {
  const [value, setValue] = useState(initialData);

  const config = {
    uploader: {
      insertImageAsBase64URI: false,
    },
  };

  return (
    <div>
      <JoditReact
        config={config}
        onChange={(content) => setValue(content)}
        defaultValue={value}
      />
    </div>
  );
};

export default NoteEditor;
