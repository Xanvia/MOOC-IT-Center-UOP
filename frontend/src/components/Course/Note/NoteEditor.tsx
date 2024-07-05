import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import SolidButton from "@/components/Buttons/SolidButton";
import { uploadImage } from "@/services/course.service";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface NoteEditorProps {
  initialValue?: string;
  onClick: (content: string) => void;
}

const NoteEditor: React.ForwardRefRenderFunction<any, NoteEditorProps> = (
  { initialValue, onClick },
  ref
) => {
  const [value, setValue] = useState<string>(initialValue ?? "");
  const quillRef = useRef<any>(null);

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      if (quill) {
        quill.getModule("toolbar").addHandler("image", imageHandler);
      }
    }
  }, []);

  useImperativeHandle(ref, () => ({
    getEditor: () => quillRef.current?.getEditor(),
  }));

  const imageHandler = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      if (input.files && input.files[0]) {
        const file = input.files[0];
        const formData = new FormData();
        formData.append("image", file);

        try {
          const imageUrl = await uploadImage(file);

          const quill = quillRef.current.getEditor();
          const range = quill.getSelection();
          quill.insertEmbed(range.index, "image", imageUrl);
        } catch (error) {
          console.error("Error uploading image: ", error);
        }
      }
    };
  };

  const handleChange = (content: string, _: any, __: any, editor: any) => {
    setValue(content);
  };

  return (
    <div>
      {ReactQuill && (
        <ReactQuill
          style={{ minHeight: "400px" }}
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
              ["link", "image"],
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
            "image",
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

export default forwardRef(NoteEditor);
