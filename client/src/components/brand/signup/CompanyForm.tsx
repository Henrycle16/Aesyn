"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { userInfo } from "@/redux/slices/user-slice";
import { useAppSelector } from "@/redux/store";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

interface CompanyFormProps {
  register: any;
  errors: any;
  getValues: any;
}

const CompanyForm = ({
  register,
  errors,
  getValues,
}: CompanyFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const industry = useAppSelector((state) => state.userInfoReducer.value.industry);

  const options = [
    { value: "Agency", label: "Agency" },
    { value: "E-commerce", label: "E-commerce" },
    { value: "Website/App", label: "Website/App" },
    { value: "Brick & Mortar", label: "Brick & Mortar" },
    { value: "Other", label: "Other" },
  ];

  const toggleSelectClick = () => {
    setIsOpen(!isOpen);
  };

  const toggleSelectBlur = () => {
    if (isOpen) {
      setIsOpen(!isOpen);
    }
  };

  const dispatch = useDispatch<AppDispatch>();
  let currentStep = useAppSelector((state) => state.userInfoReducer.value.currentStep);

  const onNext = () => {
    dispatch(userInfo({ companyName: getValues("companyName")}));
    dispatch(userInfo({ currentStep: currentStep + 1 }));
  }

  return (
    <div className="flex flex-col w-full">
      {/* Handles Brand Name and Industry Selection */}
      <div className="w-7/12 mx-auto my-auto">
        <label className="form-control w-full mb-4">
          <div className="label">
            <span className="label-text font-bold text-lg">
              What is your brand name?
            </span>
          </div>
          <input
            type="text"
            placeholder="Brand Name"
            className="input input-bordered w-full focus:outline-none focus:ring-1 focus:ring-inset focus:ring-blue-500 focus:border-blue-500 rounded-md focus:bg-gray-100"
            id="companyName"
            {...register("companyName")}
            maxLength={50}
          />
          <p className="mt-1 text-sm text-red-400 min-h-5">
            {errors.companyName?.message}
          </p>
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold text-lg">
              What industry best describes your brand?
            </span>
          </div>
          <div className={`relative inline-block w-full`}>
            <select
              className={`input input-bordered w-full focus:outline-none focus:ring-1 focus:ring-inset focus:ring-blue-500 focus:border-blue-500 focus:bg-gray-100 rounded-md pr-10 ${
                isOpen ? "border-b-1" : ""
              }`}
              id="industry"
              name="industry"
              value={industry}
              onChange={(e) => dispatch(userInfo({ industry: e.target.value }))}
              onClick={toggleSelectClick}
              onBlur={toggleSelectBlur}
            >
              <option value="" disabled hidden>
                Please select an industry
              </option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
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
      <div className="self-end">
        <Button
          disabled={
            !getValues("companyName") ||
            industry === "" ||
            !!errors.companyName
          }
          onClick={onNext}
          type="button"
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          className="bg-muiblue py-3 px-6"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CompanyForm;
