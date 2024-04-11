"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface CompanyFormProps {
  handleNextStep: () => void;
  handleFormChange: (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => void;
  formData: any;
}

const CompanyForm = ({
  formData,
  handleFormChange,
  handleNextStep,
}: CompanyFormProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="grid grid-cols-9 grid-rows-9 gap-4 w-full h-full">
      {/* Handles Brand Name and Industry Selection */}
      <div className="col-start-3 col-span-5 row-start-3 row-span-3 justify-center items-center">
        <label className="form-control w-full mb-8">
          <div className="label">
            <span className="label-text font-bold text-lg">
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
          <div className={`relative inline-block w-full`}>
            <select
              className={`input input-bordered w-full pr-10 ${
                isOpen ? "border-b-1" : ""
              }`}
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={(e) => handleFormChange(e)}
              onClick={toggleSelect}
            >
              <option value="" disabled hidden>
                Please select an industry
              </option>
              <option value="Agency">Agency</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Website/App">Website/App</option>
              <option value="Brick & Mortar">Brick & Mortar</option>
              <option value="Other">Other</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className={`h-5 w-5 transform transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </label>
      </div>

      {/* Next Button */}
      <div className="col-start-8 col-span-1 row-start-8 row-span-1 justify-end pt-5">
        <Button
          disabled={!formData.companyName || !formData.industry}
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
