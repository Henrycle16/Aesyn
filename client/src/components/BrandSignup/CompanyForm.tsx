"use client";

import React from "react";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface CompanyFormProps {
  handleNextStep: () => void;
  handleFormChange: (event: any) => void;
  formData: any;
}

const CompanyForm = ({ formData, handleFormChange, handleNextStep } : CompanyFormProps) => {
  return (
    <div className="grid grid-cols-9 grid-rows-9 gap-4 w-full h-full">
      <div className="col-start-3 col-span-5 row-start-3 row-span-3 justify-center items-center">
        <label className="form-control w-full mb-8">
          <div className="label">
            <span className="label-text font-bold	text-lg">
              What is your brand name?
            </span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            name="companyName"
            value={formData.companyName}
            onChange={(e) => handleFormChange(e)}
          />
        </label>
        <label className="form-control w-full mb-4">
          <div className="label">
            <span className="label-text font-bold text-lg">
              What industry best describes your brand?
            </span>
          </div>
          <select
            className="input input-bordered w-full"
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={(e) => handleFormChange(e)}
          >
            <option value="Agency">Agency</option>
            <option value="E-commerce">E-commerce</option>
            <option value="App">Website/App</option>
            <option value="BNM">Brick & Mortar</option>
            <option value="Other">Other</option>
          </select>
        </label>
      </div>
      <div className="col-start-8 col-span-1 row-start-8 row-span-1 justify-end">
        <Button
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

export default CompanyForm;
