import React, { useState, useRef, useEffect } from "react";
import { uploadQuizFile, editNote } from "@/services/course.service"; // Assuming editNote here is to update the note with file_url
import { toast } from "sonner";
import { UploadCloud, FileText, X, Loader2 } from 'lucide-react'; // Using lucide-react for icons

interface FileUploadProps {
  noteId: number;
  initialFileUrl?: string | null;
  reloadData?: () => void; // Optional: To refresh parent component data
}

const FileUpload: React.FC<FileUploadProps> = ({ noteId, initialFileUrl, reloadData }) => {
  const [file, setFile] = useState<File | null>(null);
  const [currentFileUrl, setCurrentFileUrl] = useState<string | null>(initialFileUrl || null);
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrentFileUrl(initialFileUrl || null);
    if (initialFileUrl) {
        try {
            const urlParts = initialFileUrl.split('/');
            setFileName(decodeURIComponent(urlParts[urlParts.length - 1]));
        } catch (e) {
            setFileName("Attached File");
        }
    } else {
        setFileName(null);
    }
  }, [initialFileUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) { // Example: 10MB limit
        toast.error("File is too large. Maximum size is 10MB.");
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Reset file input
        }
        return;
      }
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }

    setIsUploading(true);
    try {
      // The uploadQuizFile service is expected to return an object with file_url
      const response = await uploadQuizFile(file);
      const uploadedFileUrl = response.file_url; // Adjust if the response structure is different

      if (!uploadedFileUrl) {
        throw new Error("File URL not returned from upload service.");
      }

      // Update the note with the new file URL
      // Passing undefined for content and the URL for file_url
      await editNote(noteId, undefined, uploadedFileUrl);

      setCurrentFileUrl(uploadedFileUrl);
      toast.success("File uploaded and note updated successfully.");
      if (reloadData) reloadData();
    } catch (error: any) {
      console.error("Error uploading file:", error);
      toast.error(error.message || "Failed to upload file.");
    } finally {
      setIsUploading(false);
      setFile(null); // Clear the selected file after attempting upload
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset file input
      }
    }
  };

  const handleRemoveFile = async () => {
    if (!currentFileUrl) return;
    // Optimistically update UI, or wait for API confirmation
    setIsUploading(true); // Use isUploading to disable buttons during removal
    try {
      // Update the note to remove the file URL by passing empty string for file_url
      await editNote(noteId, undefined, ""); // Empty string to remove the file URL

      toast.success("File removed and note updated successfully.");
      setCurrentFileUrl(null);
      setFile(null);
      setFileName(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      if (reloadData) reloadData();
    } catch (error: any) {
      console.error("Error removing file:", error);
      toast.error(error.message || "Failed to remove file.");
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-4 bg-slate-50 rounded-lg shadow space-y-4">
      {currentFileUrl ? (
        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-md">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-green-600" />
            <a
              href={currentFileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-green-700 hover:text-green-900 hover:underline truncate"
              title={fileName || currentFileUrl}
            >
              {fileName || "View Attached File"}
            </a>
          </div>
          <button
            onClick={handleRemoveFile}
            disabled={isUploading}
            className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full disabled:opacity-50"
            aria-label="Remove file"
          >
            {isUploading && !file ? <Loader2 className="w-5 h-5 animate-spin" /> : <X className="w-5 h-5" />}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div
            className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
            onClick={triggerFileInput}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                setFile(e.dataTransfer.files[0]);
                setFileName(e.dataTransfer.files[0].name);
              }
            }}
            onDragOver={(e) => e.preventDefault()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.doc,.docx,.txt,.jpg,.png" // Specify acceptable file types
            />
            <UploadCloud className="w-10 h-10 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-400">Max file size: 10MB. Allowed types: PDF, DOC, DOCX, TXT, JPG, PNG</p>
          </div>

          {fileName && !currentFileUrl && (
            <div className="text-sm text-gray-700">
              Selected file: <span className="font-medium">{fileName}</span>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={isUploading || !file}
            className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading && file ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload File"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
