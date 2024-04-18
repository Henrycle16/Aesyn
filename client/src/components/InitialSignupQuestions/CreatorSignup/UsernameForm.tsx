"use client";

import { Button, ClickAwayListener, IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

interface UsernameFormProps {
  handleNextStep: () => void;
  handleFormChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  formData: any;
}

const UsernameForm = ({
  formData,
  handleFormChange,
  handleNextStep,
}: UsernameFormProps) => {
  return (
    <div className="grid grid-cols-9 grid-rows-9 gap-4 w-full h-full">
      {/* Handles Username and gender selection*/}
      <div className="col-start-3 col-span-5 row-start-4 row-span-3 justify-center items-center">
        <label className="form-control w-full mb-8">
          <div className="label">
            <span className="label-text font-bold text-lg">Username</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            name="userName"
            value={formData.userName}
            onChange={(e) => handleFormChange(e)}
          />
        </label>
      </div>

      {/* Next Button */}
      <div className="col-start-8 col-span-1 row-start-8 row-span-1 justify-end pt-5">
        <Button
          disabled={!formData.userName}
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
