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

import { userInfo, removePref, addPref } from "@/redux/slices/user-slice";
import { useAppSelector } from "@/redux/store";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

// social media Options List
const socialMediasArray = [
  { key: 0, label: "Instagram", icon: <FaInstagram /> },
  { key: 1, label: "TikTok", icon: <FaTiktok /> },
  { key: 2, label: "Youtube", icon: <FaYoutube /> },
  { key: 3, label: "Twitch", icon: <FaTwitch /> },
  { key: 4, label: "Twitter/X", icon: <FaSquareXTwitter /> },
];

const SocialMediaSelect = ({
}) => {
  const dispatch = useDispatch<AppDispatch>();
  let currentStep = useAppSelector((state) => state.userInfoReducer.value.currentStep);
  let preferences = useAppSelector((state) => state.userInfoReducer.value.preferences);

  const handlePreferencesChanges = (selected: string) => {
    if (preferences.includes(selected)) {
      dispatch(removePref(selected));
    } else {
      dispatch(addPref(selected));
    }
  }

  const onNext = () => {
    dispatch(userInfo({ currentStep: currentStep + 1 }));
  }

  return (
    <div className="flex flex-col w-full">
      {/* Box to seperate each social media preference */}
      <Box className="w-4/6 mx-auto my-auto">
        <div className="label">
          <span className="label-text font-bold text-lg">
            Select your platform(s). 
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
                    ? "btn-primary-color text-white"
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
          className="btn-primary-color py-3 px-6"
          endIcon={<ArrowForwardIcon />}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default SocialMediaSelect;
