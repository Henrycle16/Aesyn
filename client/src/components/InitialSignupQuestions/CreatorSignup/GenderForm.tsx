"use client";

import {
  Button,
  ClickAwayListener,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

interface UsernameFormProps {
  handleNextStep: () => void;
  handlePrevStep: () => void;
  handleFormChange: (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => void;
  formData: any;
}

const UsernameForm = ({
  formData,
  handleFormChange,
  handleNextStep,
  handlePrevStep,
}: UsernameFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = React.useState(false);

  const options = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

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
        <label className="form-control w-full mb-4">
          <div className="label">
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
        </label>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
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

export default UsernameForm;
