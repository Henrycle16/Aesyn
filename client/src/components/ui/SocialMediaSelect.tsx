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

import { creatorInfo, removePref, addPref } from "@/redux/slices/creator-slice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";

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
  const dispatch = useDispatch<AppDispatch>();
  let currentStep = useAppSelector((state) => state.creatorInfoReducer.value.currentStep);
  let preferences = useAppSelector((state) => state.creatorInfoReducer.value.preferences);

  const handlePreferencesChanges = (selected: string) => {
    if (preferences.includes(selected)) {
      dispatch(removePref(selected));
    } else {
      dispatch(addPref(selected));
    }
  }

  const onNext = () => {
    dispatch(creatorInfo({ currentStep: currentStep + 1 }));
    handleNextStep();
  }

  return (
    <div className="flex flex-col w-full">
      {/* Box to seperate each social media preference */}
      <Box className="w-4/6 mx-auto my-auto">
        <div className="label">
          <span className="label-text font-bold text-lg">
            Social media preferences:
          </span>
        </div>
        <Box className="grid grid-cols-3 grid-rows-3 gap-5 w-full pt-4">
          {socialMediasArray.map((data) => (
            <Chip
              key={data.key}
              onClick={() => handlePreferencesChanges(data.label)}
              variant={
                preferences.includes(data.label)
                  ? "filled"
                  : "outlined"
              }
              icon={data.icon}
              label={data.label}
              className={
                "text-base h-10 " +
                `${
                  preferences.includes(data.label)
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
          disabled={!preferences.length}
          onClick={onNext}
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
