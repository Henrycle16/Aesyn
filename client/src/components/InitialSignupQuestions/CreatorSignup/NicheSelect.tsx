"use client";

import React from "react";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface NicheSelectProps {
  handleNextStep: () => void;
  handlePrevStep: () => void;
  formData: any;
}

const ContactForm = ({
  formData,
  handleNextStep,
  handlePrevStep,
}: NicheSelectProps) => {
  return (
    <div className="grid grid-cols-9 grid-rows-9 gap-4 w-full h-full">
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

      {/*Niche Selection Label*/}
      <div className="col-start-3 col-span-5 row-start-2 row-span-1 justify-center items-center">
        <label className="form-control w-full mb-6">
          <div className="label" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span className="label-text font-bold text-lg">
              Select the niche(s) that best fit your content
            </span>
            <p className="label-text font-light text-sm">Select up to 6 niches</p>
          </div>
        </label>
      </div>

      {/* Next Button */}
      <div className="col-start-8 col-span-1 row-start-8 row-span-1 justify-end pt-5">
        <Button
          onClick={handleNextStep}
          type="button"
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          className="col-span-1"
          sx={{ padding: "12px 24px" }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ContactForm;
