import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { TINY_API_KEY } from "@/utils/constants";

interface TextEditorProps {
  initialData: string;
}

const TextEditor: React.FC<TextEditorProps> = ({ initialData }) => {
  const editorRef = useRef<any>(null);

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const exampleImageUploadHandler : any = (blobInfo: any, success: any, failure: any, progress: any) => {
    console.log("Uploading image...");
  
    // Simulate progress (if provided)
    if (progress) {
      progress(50);
    }
  
    // Simulate success after a delay
    setTimeout(() => {
      const fakeSuccess = true; // Simulate successful upload
      if (fakeSuccess) {
        console.log("Image upload successful!");
        success("https://example.com/image.jpg"); // Replace with actual uploaded image URL
      } else {
        console.error("Image upload failed!");
        failure("Image upload failed!"); // Replace with appropriate failure message
      }
    }, 2000);
  };
  
  return (
    <div>
      <Editor
        apiKey={TINY_API_KEY}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={initialData}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help | image",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          images_upload_handler: exampleImageUploadHandler,
        }}
      />
      <button onClick={log}>Log editor content</button>
    </div>
  );
};

export default TextEditor;
