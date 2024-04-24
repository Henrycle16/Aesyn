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
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

interface GenderFormProps {
  handleNextStep: () => void;
  handlePrevStep: () => void;
  handleGenderChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  formData: any;
}

const GenderForm = ({
  formData,
  handleGenderChange,
  handleNextStep,
  handlePrevStep,
}: GenderFormProps) => {
  return (
    <div className="grid grid-cols-9 grid-rows-9 gap-4 w-full h-full">
      {/* Back Button */}
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

      {/* Handles Gender selection*/}
      <div className="col-start-3 col-span-5 row-start-3 row-span-5 justify-center items-center">
        <div className="form-control w-full mb-4">
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
              onChange={handleGenderChange}
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
      <div className="col-start-8 col-span-1 row-start-8 row-span-1 justify-end pt-5">
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
      </div>
    </div>
  );
};

export default GenderForm;
