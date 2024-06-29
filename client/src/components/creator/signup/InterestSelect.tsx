import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "../../../styles/interestSelect.css";

import { userInfo, removeInterest, addInterest } from "@/redux/slices/user-slice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { interestsArray } from "@/lib/user/interestsLib";


const InterestForm = ({
}) => {
  const dispatch = useDispatch<AppDispatch>();
  let currentStep = useAppSelector((state) => state.userInfoReducer.value.currentStep);
  let interests = useAppSelector((state) => state.userInfoReducer.value.interests);

  const handleInterestChanges = (selected: string) => {
    if (interests.includes(selected)) {
      dispatch(removeInterest(selected));
    } else {
      dispatch(addInterest(selected));
    }
  }

  const onNext = () => {
    dispatch(userInfo({ currentStep: currentStep + 1 }));
  }

  return (
    <div className="flex flex-col w-full">
      <div className="w-9/12 mx-auto my-auto">
        {/*Interest Selection Label*/}
        <label className="form-control mb-4">
          <div className="label flex flex-col items-start">
            <span className="label-text font-bold text-lg">
              Select the interest(s) that best match your content.  
            </span>
            <p className="label-text font-light text-sm">
              Select up to 6
            </p>
          </div>
        </label>

        {/* interest Select Options */}
        <div className="flex flex-wrap gap-x-8 gap-y-3 overflow-y-auto max-h-[16rem]">
          {interestsArray.map((data) => (
            <Chip
              key={data.key}
              onClick={() => {
                if (interests.length < 6 || interests.includes(data.label)) {
                  handleInterestChanges(data.label)
                }
              }}
              variant={
                interests.includes(data.label) ? "filled" : "outlined"
              }
              label={data.label}
              className={
                "rounded-3xl text-base h-10 w-[15rem] " +
                `${
                  interests.includes(data.label)
                    ? "bg-blue-500 text-white"
                    : "bg-white"
                }`
              }
            />
          ))}
        </div>
      </div>

      {/* Next Button */}
      <div className="self-end">
        <Button
          disabled={!interests.length}
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

export default InterestForm;
