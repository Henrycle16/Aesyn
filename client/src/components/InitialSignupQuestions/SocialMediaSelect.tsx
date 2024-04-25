"use client";

import { Box, Button, Chip } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  FaInstagram,
  FaSquareXTwitter,
  FaTiktok,
  FaTwitch,
  FaYoutube,
} from "react-icons/fa6";

interface SocialMediaSelectProps {
  handleNextStep: () => void;
  handlePrevStep: () => void;
  handlePreferenceChange: (selected: string) => void;
  formData: any;
}

const SocialMediaSelect = ({ formData, handlePreferenceChange, handleNextStep, handlePrevStep } : SocialMediaSelectProps) => {
  return (
    <div className="grid grid-cols-9 grid-rows-9 gap-4 w-full h-full">
      <div className="col-start-1 col-span-1 row-start-1 row-span-1 justify-end">
        <Button
          onClick={handlePrevStep}
          variant="text"
          startIcon={<ArrowBackIcon />}
          className="col-span-1"
          sx={{ padding: "12px 24px" }}
        >
          back
        </Button>
      </div>


      {/* Box to seperate each social media preference */}
      <Box className="col-start-3 col-span-5 row-start-3 row-span-6 justify-center items-center">
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
            variant={formData.preferences.includes("TikTok") ? "filled" : "outlined"}
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
            variant={formData.preferences.includes("Youtube") ? "filled" : "outlined"}
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
            variant={formData.preferences.includes("Twitch") ? "filled" : "outlined"}
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
      <div className="col-start-8 col-span-1 row-start-8 row-span-1 justify-end pt-5">
        <Button
          type="button"
          disabled={formData.preferences.length === 0}
          onClick={handleNextStep}
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          className="col-span-1"
          sx={{ padding: "12px 24px" }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default SocialMediaSelect;
