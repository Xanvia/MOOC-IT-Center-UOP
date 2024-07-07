import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { TINY_API_KEY } from "@/utils/constants";
import { uploadImage } from "@/services/course.service";
import SolidButton from "@/components/Buttons/SolidButton";
interface TextEditorProps {
  initialData: string;
  onClick: (value: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ initialData, onClick }) => {
  const editorRef = useRef<any>(null);

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const exampleImageUploadHandler: any = async (
    blobInfo: any,
    success: any,
    failure: any,
    progress: any
  ) => {
    try {
      const file = new File([blobInfo.blob()], blobInfo.filename(), {
        type: blobInfo.blob().type,
      });

      const imageUrl = await uploadImage(file, 1);
      if (typeof imageUrl === "string" && imageUrl.length > 0) {
        if (editorRef.current) {
          editorRef.current.insertContent(
            `<img src="${imageUrl}" alt="Uploaded Image" />`
          );
          success(imageUrl as string);
        }
      } else {
        throw new Error("Invalid image URL");
      }
    } catch (error) {
      console.error("Image upload failed!", error);
      failure("Image upload failed!");
    }
  };

  return (
    <div>
      <Editor
        apiKey={TINY_API_KEY}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={initialData}
        init={{
          height: 800,
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
          automatic_uploads: true,
          file_picker_types: "image",
        }}
      />
      <div className="flex justify-end mt-8">
        <SolidButton
          type="button"
          text="S A V E"
          onClick={() => onClick(editorRef.current.getContent())}
        />
      </div>
    </div>
  );
};

export default TextEditor;
