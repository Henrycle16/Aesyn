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
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface SocialMediaSelectProps {
  formData: any;
  handlePreferenceChange: (selected: string) => void;
  handleNextStep: () => void;
  // setNextButtonDisabled: (value: boolean) => void;
  // handlePrevStep: () => void;
}

const SocialMediaSelect = ({
  formData,
  handlePreferenceChange,
  handleNextStep,
  // handlePrevStep,
  // setNextButtonDisabled,
}: SocialMediaSelectProps) => {
  return (
    <div  className="flex flex-col w-full">
      {/* Box to seperate each social media preference */}
      {/* !TODO: Refactor chips to render as an array */}
      <Box className="w-4/6 mx-auto my-auto">
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

      {/* Next Button */}
      <div className="self-end">
        <Button
          disabled={!formData.preferences.length}
          onClick={handleNextStep}
          type="button"
          variant="contained"
          className="bg-muiblue py-3 px-6"
          endIcon={<ArrowForwardIcon />}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default SocialMediaSelect;
