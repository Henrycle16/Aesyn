"use client";

import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import CloseIcon from "@mui/icons-material/Close";

import { motion } from "framer-motion";

interface ContentButtonProps {
  resetTrigger: boolean;
  onResetComplete: () => void;
}

const ContentButton: React.FC<ContentButtonProps> = ({
  resetTrigger,
  onResetComplete
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isPhoto, setIsPhoto] = useState("Add content");
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

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
            <button
              type="button"
              onMouseEnter={() => {
                setHoveredButton("image");
                setIsPhoto("Upload an image");
              }}
              onMouseLeave={() => {
                setHoveredButton(null);
                setIsPhoto("Add content");
              }}
            >
              <div
                className={`flex p-1 border-2 ${getDynamicStyle(
                  "image"
                )} rounded-3xl cursor-pointer`}
              >
                <ImageOutlinedIcon />
              </div>
            </button>
          </motion.div>
          <motion.div
            transition={{ duration: 0.3 }}
            initial={{ y: -10, x: -10, opacity: 0 }}
            animate={{ y: 0, x: 0, opacity: 1 }}
            exit={{ y: -10, x: -10, opacity: 0 }}
          >
            <button
              type="button"
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
