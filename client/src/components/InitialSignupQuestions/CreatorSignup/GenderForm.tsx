"use client";

import {
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Tooltip,
} from "@mui/material";
import { use, useEffect } from "react";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

interface GenderFormProps {
  // handleNextStep: () => void;
  // handlePrevStep: () => void;
  // handleGenderChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setNextButtonDisabled: (value: boolean) => void;
  formData: any;
}

const GenderForm = ({
  formData,
  // handleGenderChange,
  setNextButtonDisabled,
  handleFormChange
  // handleNextStep,
  // handlePrevStep,
}: GenderFormProps) => {
  useEffect(() => {
    if (!formData.gender) {
      setNextButtonDisabled(true);
    }

  })
  

  return (
    <>
      {/* Handles Gender selection*/}
      <div className="w-4/6">
        <div className="form-control">
          <div className="label mb-5">
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
              value={formData.gender}
              onChange={(e) => {
                handleFormChange(e);
                setNextButtonDisabled(false);
              }}
            >
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
                className="rounded border p-2 mb-4 w-full"
                style={{
                  marginLeft: 0,
                  marginRight: 0,
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "grey",
                }}
              />
              <FormControlLabel
                value="Male"
                control={<Radio />}
                label="Male"
                className="rounded border p-2 mb-4 w-full"
                style={{
                  marginLeft: 0,
                  marginRight: 0,
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "grey",
                }}
              />
              <FormControlLabel
                value="Other"
                control={<Radio />}
                label="Other"
                className="rounded border p-2 mb-4 w-full"
                style={{
                  marginLeft: 0,
                  marginRight: 0,
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "grey",
                }}
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>

      {/* Next Button */}
      {/* <div className="col-start-8 col-span-1 row-start-8 row-span-1 justify-end pt-5">
        <Button
          disabled={!formData.gender}
          onClick={handleNextStep}
          type="submit"
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          className="col-span-1"
          style={{ padding: "12px 24px" }}
        >
          Next
        </Button>
      </div> */}
    </>
  );
};

export default GenderForm;
