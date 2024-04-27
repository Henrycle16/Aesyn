"use client";

import React from "react";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface ContactFormProps {
  handleNextStep: () => void;
  handlePrevStep: () => void;
  handleFormChange: (event: any) => void;
  formData: any;
}

const ContactForm = ({ formData, handleFormChange, handleNextStep, handlePrevStep } : ContactFormProps) => {
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


      {/* Handles POC Contact Information */}
      <div className="col-start-3 col-span-5 row-start-2 row-span-3 justify-center items-center">
        <label className="form-control w-full mb-6">
          <div className="label">
            <span className="label-text font-bold text-lg">
              Primary Contact Name
            </span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            required
            className="input input-bordered w-full"
            name="contactPersonName"
            value={formData.contactPersonName}
            onChange={(e) => handleFormChange(e)}
          />
        </label>
        <label className="form-control w-full mb-6">
          <div className="label">
            <span className="label-text font-bold text-lg">
              Primary Contact Phone Number
            </span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            required
            className="input input-bordered w-full"
            name="contactPhoneNumber"
            value={formData.contactPhoneNumber}
            onChange={(e) => handleFormChange(e)}
          />
        </label>
        <label className="form-control w-full mb-6">
          <div className="label">
            <span className="label-text font-bold text-lg">
              Primary Contact Email
            </span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            required
            className="input input-bordered w-full"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={(e) => handleFormChange(e)}
          />
        </label>
      </div>


      {/* Next Button */}
      <div className="col-start-8 col-span-1 row-start-8 row-span-1 justify-end pt-5">
        <Button
         disabled={!formData.contactPersonName || !formData.contactPhoneNumber || !formData.contactEmail}
          onClick={handleNextStep}
          type="button"
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          className="col-span-1 bg-muiblue-style"
          sx={{ padding: "12px 24px" }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ContactForm;
