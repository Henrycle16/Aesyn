"use client";
//import { uploadToS3 } from "@/lib/s3";
import { useMutation } from "@tanstack/react-query";
import Upload from "@/components/ui/svgs/Upload";
import { Inbox, Loader2 } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const FileUpload = () => {
  const router = useRouter();
  const [uploading, setUploading] = React.useState(false);
  // const { mutate, isPending } = useMutation({
  //   mutationFn: async ({
  //     file_key,
  //     file_name,
  //   }: {
  //     file_key: string;
  //     file_name: string;
  //   }) => {
  //     const response = await axios.post("/api/create-chat", {
  //       file_key,
  //       file_name,
  //     });
  //     return response.data;
  //   },
  // });

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

      // try {
      //   setUploading(true);
      //   const data = await uploadToS3(file);
      //   if (!data?.file_key || !data.file_name) {
      //     toast.error("Something went wrong.");
      //     return;
      //   }
      //   mutate(data, {
      //     onSuccess: ({ chat_id }) => {
      //       toast.success("Chat created!");
      //       router.push(`/chat/${chat_id}`);
      //     },
      //     onError: (error) => {
      //       toast.error("Error creating chat.");
      //       console.error(error);
      //     },
      //   });
      // } catch (error) {
      //   console.log(error);
      // } finally {
      //   setUploading(false);
      // }
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
