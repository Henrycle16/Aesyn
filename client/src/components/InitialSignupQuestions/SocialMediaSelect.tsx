"use client";

import { useEffect } from "react";
import { Box, Chip } from "@mui/material";
import {
  FaInstagram,
  FaSquareXTwitter,
  FaTiktok,
  FaTwitch,
  FaYoutube,
} from "react-icons/fa6";

interface SocialMediaSelectProps {
  // handleNextStep: () => void;
  // handlePrevStep: () => void;
  setNextButtonDisabled: (value: boolean) => void;
  handlePreferenceChange: (selected: string) => void;
  formData: any;
}

const SocialMediaSelect = ({
  formData,
  handlePreferenceChange,
  // handleNextStep,
  // handlePrevStep,
  setNextButtonDisabled,
}: SocialMediaSelectProps) => {
  useEffect(() => {
    if (!formData.preferences) {
      setNextButtonDisabled(true);
    }

  })

  return (
    <>
      {/* Box to seperate each social media preference */}
      {/* !TODO: Refactor chips to render as an array */}
      <Box>
        <div className="label">
          <span className="label-text font-bold text-lg">
            Social media preferences:
          </span>
        </div>
        <Box className="grid grid-cols-3 grid-rows-3 gap-5 w-full pt-8">
          <Chip
            onClick={() => handlePreferenceChange("Instagram")}
            variant={
              formData.preferences.includes("Instagram") ? "filled" : "outlined"
            }
            icon={<FaInstagram />}
            label="Instagram"
            sx={{ fontSize: "16px", paddingY: "20px" }}
            className={`${
              formData.preferences.includes("Instagram")
                ? "bg-blue-500 text-white"
                : "bg-white"
            }`}
          />
          <Chip
            onClick={() => handlePreferenceChange("TikTok")}
            variant={
              formData.preferences.includes("TikTok") ? "filled" : "outlined"
            }
            icon={<FaTiktok />}
            label="TikTok"
            sx={{ fontSize: "16px", paddingY: "20px" }}
            className={`${
              formData.preferences.includes("TikTok")
                ? "bg-blue-500 text-white"
                : "bg-white"
            }`}
          />
          <Chip
            onClick={() => handlePreferenceChange("Youtube")}
            variant={
              formData.preferences.includes("Youtube") ? "filled" : "outlined"
            }
            icon={<FaYoutube />}
            label="Youtube"
            sx={{ fontSize: "16px", paddingY: "20px" }}
            className={`${
              formData.preferences.includes("Youtube")
                ? "bg-blue-500 text-white"
                : "bg-white"
            }`}
          />
          <Chip
            onClick={() => handlePreferenceChange("Twitch")}
            variant={
              formData.preferences.includes("Twitch") ? "filled" : "outlined"
            }
            icon={<FaTwitch />}
            label="Twitch"
            sx={{ fontSize: "16px", paddingY: "20px" }}
            className={`${
              formData.preferences.includes("Twitch")
                ? "bg-blue-500 text-white"
                : "bg-white"
            }`}
          />{" "}
          <Chip
            onClick={() => handlePreferenceChange("Twitter/X")}
            variant={
              formData.preferences.includes("Twitter/X") ? "filled" : "outlined"
            }
            icon={<FaSquareXTwitter />}
            label="Twitter/X"
            sx={{ fontSize: "16px", paddingY: "20px" }}
            className={`${
              formData.preferences.includes("Twitter/X")
                ? "bg-blue-500 text-white"
                : "bg-white"
            }`}
          />{" "}
        </Box>
      </Box>
    </>
  );
};

export default SocialMediaSelect;
