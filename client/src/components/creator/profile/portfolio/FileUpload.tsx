"use client";
import Upload from "@/components/ui/svgs/Upload";
import { Loader2 } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";

const FileUpload = () => {
  const [uploading, setUploading] = React.useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "video/mp4": [".mp4"],
      "video/quicktime": [".mov"]
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];

      //File is larger than 10mb
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File too large.");
        return;
      }
    },
  });

  return (
    <div className="mt-1">
      <div
        {...getRootProps({
          className:
            "border-dotted border-2 rounded-md cursor-pointer border-gray-300 py-8 flex justify-center items-center flex-col",
        })}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <>
            <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
          </>
        ) : (
          <div className="border-2 border-gray-300 rounded-3xl p-1">
            <Upload />
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
