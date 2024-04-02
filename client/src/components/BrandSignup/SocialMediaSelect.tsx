"use client";

import { Box, Button, Chip, Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  FaInstagram,
  FaSquareXTwitter,
  FaTiktok,
  FaTwitch,
  FaYoutube,
} from "react-icons/fa6";
import { useState } from "react";

interface SocialMediaSelectProps {
  onBack: () => void;
  onSave: (info: any) => void;
}

const SocialMediaSelect: React.FC<SocialMediaSelectProps> = ({ onBack }) => {
  const [selectedChips, setSelectedChips] = useState<string[]>([]);

  const handleClick = (label: string) => {
    setSelectedChips((prevSelected) => {
      if (prevSelected.includes(label)) {
        return prevSelected.filter((chip) => chip !== label);
      } else {
        return [...prevSelected, label];
      }
    });
  };

  return (
    <div className="grid grid-cols-9 grid-rows-9 gap-4 w-full h-full">
      <div className="col-start-1 col-span-1 row-start-1 row-span-1 justify-end">
        <Button
          onClick={onBack}
          variant="text"
          startIcon={<ArrowBackIcon />}
          className="col-span-1"
          sx={{ padding: "12px 24px" }}
        >
          back
        </Button>
      </div>
      <Box className="col-start-3 col-span-5 row-start-3 row-span-6 justify-center items-center">
        <div className="label">
          <span className="label-text font-bold text-lg">
            Social media preferences:
          </span>
        </div>
        <Box className="grid grid-cols-3 grid-rows-3 gap-5 w-full pt-8">
          <Chip
            onClick={() => handleClick("Instagram")}
            variant={
              selectedChips.includes("Instagram") ? "filled" : "outlined"
            }
            icon={<FaInstagram />}
            label="Instagram"
            sx={{ fontSize: "16px", paddingY: "20px" }}
            className={`${
              selectedChips.includes("Instagram")
                ? "bg-blue-500 text-white"
                : "bg-white"
            }`}
          />
          <Chip
            onClick={() => handleClick("TikTok")}
            variant={selectedChips.includes("TikTok") ? "filled" : "outlined"}
            icon={<FaTiktok />}
            label="TikTok"
            sx={{ fontSize: "16px", paddingY: "20px" }}
            className={`${
              selectedChips.includes("TikTok")
                ? "bg-blue-500 text-white"
                : "bg-white"
            }`}
          />
          <Chip
            onClick={() => handleClick("Youtube")}
            variant={selectedChips.includes("Youtube") ? "filled" : "outlined"}
            icon={<FaYoutube />}
            label="Youtube"
            sx={{ fontSize: "16px", paddingY: "20px" }}
            className={`${
              selectedChips.includes("Youtube")
                ? "bg-blue-500 text-white"
                : "bg-white"
            }`}
          />
          <Chip
            onClick={() => handleClick("Twitch")}
            variant={selectedChips.includes("Twitch") ? "filled" : "outlined"}
            icon={<FaTwitch />}
            label="Twitch"
            sx={{ fontSize: "16px", paddingY: "20px" }}
            className={`${
              selectedChips.includes("Twitch")
                ? "bg-blue-500 text-white"
                : "bg-white"
            }`}
          />{" "}
          <Chip
            onClick={() => handleClick("Twitter/X")}
            variant={
              selectedChips.includes("Twitter/X") ? "filled" : "outlined"
            }
            icon={<FaSquareXTwitter />}
            label="Twitter/X"
            sx={{ fontSize: "16px", paddingY: "20px" }}
            className={`${
              selectedChips.includes("Twitter/X")
                ? "bg-blue-500 text-white"
                : "bg-white"
            }`}
          />{" "}
        </Box>
      </Box>
      <div className="col-start-8 col-span-1 row-start-8 row-span-1 justify-end">
        <Button
          type="submit"
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
