import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
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
}

// social media Options List
const socialMediasArray = [
  { key: 0, label: "Instagram", icon: <FaInstagram /> },
  { key: 1, label: "TikTok", icon: <FaTiktok /> },
  { key: 2, label: "Youtube", icon: <FaYoutube /> },
  { key: 3, label: "Twitch", icon: <FaTwitch /> },
  { key: 4, label: "Twitter/X", icon: <FaSquareXTwitter /> },
];

const SocialMediaSelect = ({
  formData,
  handlePreferenceChange,
  handleNextStep,
}: SocialMediaSelectProps) => {
  return (
    <div className="flex flex-col w-full">
      {/* Box to seperate each social media preference */}
      <Box className="w-4/6 mx-auto my-auto">
        <div className="label">
          <span className="label-text font-bold text-xl">
            Social media preferences:
          </span>
        </div>
        <Box className="grid grid-cols-3 grid-rows-3 gap-5 w-full pt-8">
          {socialMediasArray.map((data) => (
            <Chip
              key={data.key}
              onClick={() => handlePreferenceChange(data.label)}
              variant={
                formData.preferences.includes(data.label)
                  ? "filled"
                  : "outlined"
              }
              icon={data.icon}
              label={data.label}
              className={
                "text-base h-10 " +
                `${
                  formData.preferences.includes(data.label)
                    ? "bg-blue-500 text-white"
                    : "bg-white"
                }`
              }
            />
          ))}
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
