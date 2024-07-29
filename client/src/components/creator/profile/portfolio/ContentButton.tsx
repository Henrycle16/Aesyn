"use client";

import React, { useState, useEffect, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import CloseIcon from "@mui/icons-material/Close";

import { creatorContentInfo } from "@/redux/slices/creatorPortfolio-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";

import { motion } from "framer-motion";

const MIN_DIMENSION = 150;

interface ContentButtonProps {
  resetTrigger: boolean;
  onResetComplete: () => void;
}

const ContentButton: React.FC<ContentButtonProps> = ({
  resetTrigger,
  onResetComplete,
}) => {
  const currentContent = useAppSelector(
    (state) => state.creatorContentReducer.value.currentContent
  );
  const [isActive, setIsActive] = useState(false);
  const [isPhoto, setIsPhoto] = useState("Add content");
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch<AppDispatch>();

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageName = file.name;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = document.createElement("img");
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e: Event) => {
        if (error) setError("");
        const { naturalWidth, naturalHeight } =
          e.currentTarget as HTMLImageElement;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError("Image must be at least 150x150 pixels");
          return;
        }
      });

      dispatch(
        creatorContentInfo({
          currentContent: {
            ...currentContent,
            uri: imageUrl,
            name: imageName,
            mediaType: "image",
          },
        })
      );
    });
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (resetTrigger) {
      setIsActive(false);
      setIsPhoto("Add content");
      setHoveredButton(null);
      onResetComplete();
    }
  }, [resetTrigger, onResetComplete]);

  const getDynamicStyle = (buttonId: string) => {
    return hoveredButton === buttonId
      ? "border-[#3798E3] bg-[#3798E3] text-[#f9fafb]"
      : "border-[#D7D7D7] text-[#3798E3]";
  };

  const handleActive = async () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleActive}
        onMouseEnter={() => {
          setHoveredButton("add");
        }}
        onMouseLeave={() => {
          setHoveredButton(null);
        }}
      >
        <div
          className={`flex p-1 border-2 ${getDynamicStyle(
            "add"
          )} rounded-3xl cursor-pointer`}
        >
          {isActive ? <CloseIcon /> : <AddIcon />}
        </div>
      </button>

      {isActive ? (
        <div className="space-x-4 flex">
          <motion.div
            transition={{ duration: 0.3 }}
            initial={{ y: -10, x: 10, opacity: 0 }}
            animate={{ y: 0, x: 0, opacity: 1 }}
            exit={{ y: -10, x: 10, opacity: 0 }}
          >
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={onSelectFile}
            />
            <div
              className={`flex p-1 border-2 ${getDynamicStyle(
                "image"
              )} rounded-3xl cursor-pointer`}
              onMouseEnter={() => {
                setHoveredButton("image");
                setIsPhoto("Upload an image");
              }}
              onMouseLeave={() => {
                setHoveredButton(null);
                setIsPhoto("Add content");
              }}
              onClick={triggerFileInput}
            >
              <ImageOutlinedIcon />
            </div>
          </motion.div>
          <motion.div
            transition={{ duration: 0.3 }}
            initial={{ y: -10, x: -10, opacity: 0 }}
            animate={{ y: 0, x: 0, opacity: 1 }}
            exit={{ y: -10, x: -10, opacity: 0 }}
          >
            <button
              type="button"
              onClick={() => (document.getElementById('link_video_modal') as HTMLDialogElement).showModal()}
              onMouseEnter={() => {
                setHoveredButton("video");
                setIsPhoto("Link a video (YouTube)");
              }}
              onMouseLeave={() => {
                setHoveredButton(null);
                setIsPhoto("Add content");
              }}
            >
              <div
                className={`flex p-1 border-2 ${getDynamicStyle(
                  "video"
                )} rounded-3xl cursor-pointer`}
              >
                <VideocamOutlinedIcon />
              </div>
            </button>
          </motion.div>
        </div>
      ) : (
        <></>
      )}

      <div>
        <p className="pt-2 text-sm">{isPhoto}</p>
      </div>
    </>
  );
};

export default ContentButton;
