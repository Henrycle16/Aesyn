import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "../../../styles/nicheSelect.css";

import { userInfo, removeNiche, addNiche } from "@/redux/slices/user-slice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { nichesArray } from "@/lib/user/nichesLib";


const NicheForm = ({
}) => {
  const dispatch = useDispatch<AppDispatch>();
  let currentStep = useAppSelector((state) => state.userInfoReducer.value.currentStep);
  let niches = useAppSelector((state) => state.userInfoReducer.value.niches);

  const handleNicheChanges = (selected: string) => {
    if (niches.includes(selected)) {
      dispatch(removeNiche(selected));
    } else {
      dispatch(addNiche(selected));
    }
  }

  const onNext = () => {
    dispatch(userInfo({ currentStep: currentStep + 1 }));
  }

  return (
    <div className="flex flex-col w-full">
      <div className="w-9/12 mx-auto my-auto">
        {/*Niche Selection Label*/}
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

        {/* Niche Select Options */}
        <div className="flex flex-wrap gap-x-8 gap-y-3 overflow-y-auto max-h-[16rem]">
          {nichesArray.map((data) => (
            <Chip
              key={data.key}
              onClick={() => {
                if (niches.length < 6 || niches.includes(data.label)) {
                  handleNicheChanges(data.label)
                }
              }}
              variant={
                niches.includes(data.label) ? "filled" : "outlined"
              }
              label={data.label}
              className={
                "rounded-3xl text-base h-10 w-[15rem] " +
                `${
                  niches.includes(data.label)
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
          disabled={!niches.length}
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

export default NicheForm;
