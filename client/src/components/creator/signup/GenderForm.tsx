import {
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Tooltip,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { userInfo } from "@/redux/slices/user-slice";
import { useAppSelector } from "@/redux/store";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

const GenderForm = ({
}) => {

  const dispatch = useDispatch<AppDispatch>();
  let currentStep = useAppSelector((state) => state.userInfoReducer.value.currentStep);

  const gender = useAppSelector((state) => state.userInfoReducer.value.gender);

  const onNext = () => {
    dispatch(userInfo({ currentStep: currentStep + 1 }));
  }

  return (
    <div className="flex flex-col w-full">
      {/* Handles Gender selection*/}
      <div className="w-4/6 mx-auto my-auto">
        <div className="form-control">
          <div className="label mb-1">
            <span className="label-text font-bold text-xl">
              Gender{" "}
              <Tooltip
                disableFocusListener
                placement="top"
                title="Brands sometimes look for specific gender(s) when searching. This is how they can filter for it."
              >
                <IconButton style={{ padding: "5px" }}>
                  <HelpOutlineIcon style={{ fontSize: "14px" }} />
                </IconButton>
              </Tooltip>
            </span>
          </div>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              name="gender"
              value={gender}
              onChange={(e) => {
                dispatch(userInfo({ gender: e.target.value }));
              }}
            >
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
                className="mx-0 rounded border border-neutral-300 p-2 mb-4 w-full hover:bg-gray-100"
              />
              <FormControlLabel
                value="Male"
                control={<Radio />}
                label="Male"
                className="mx-0 rounded border border-neutral-300 p-2 mb-4 w-full hover:bg-gray-100"
              />
              <FormControlLabel
                value="Other"
                control={<Radio />}
                label="Other"
                className="mx-0 rounded border border-neutral-300 p-2 mb-4 w-full hover:bg-gray-100"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>

      {/* Next Button */}
      <div className="self-end">
        <Button
          disabled={gender === ""}
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

export default GenderForm;
