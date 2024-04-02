"use client";

import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Select, selectClasses } from "@mui/joy";
import Option from "@mui/joy/Option";
import { KeyboardArrowDown } from "@mui/icons-material";

interface CompanyFormProps {
  onNext: () => void;
  onSave: (info: any) => void;
  companyInfo: any;
}

const CompanyForm: React.FC<CompanyFormProps> = ({ onNext, onSave, companyInfo }) => {
 const [info, setInfo] = useState(companyInfo);

  useEffect(() => {
    setInfo(companyInfo);
  }, [companyInfo]);


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
          />
        </label>
        <label className="form-control w-full mb-4">
          <div className="label">
            <span className="label-text font-bold text-lg">
              What industry best describes your brand?
            </span>
          </div>
          <Select
            className="input input-bordered w-full"
            placeholder="Select one:"
            indicator={<KeyboardArrowDown />}
            sx={{
              width: "100%",
              [`& .${selectClasses.indicator}`]: {
                transition: "0.2s",
                [`&.${selectClasses.expanded}`]: {
                  transform: "rotate(-180deg)",
                },
              },
            }}
          >
            <Option value="Agency">Agency</Option>
            <Option value="E-commerce">E-commerce</Option>
            <Option value="App">Website/App</Option>
            <Option value="BNM">Brick & Mortar</Option>
            <Option value="Other">Other</Option>
          </Select>
        </label>
      </div>
      <div className="col-start-8 col-span-1 row-start-8 row-span-1 justify-end">
        <Button
          onClick={onNext}
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
