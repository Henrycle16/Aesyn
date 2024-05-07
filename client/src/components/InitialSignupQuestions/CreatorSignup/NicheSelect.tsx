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
    <div className="">
      
      <div className="w-9/12 mx-auto mb-8">
        {/*Niche Selection Label*/}
        <label className="form-control mb-6">
          <div className="label flex flex-col items-start">
            <span className="label-text font-bold text-lg">
              Select the niche(s) that best fit your content
            </span>
            <p className="label-text font-light text-sm">Select up to 6 niches</p>
          </div>
        </label>

        {/* Niche Select Options */}
        <div className="flex flex-wrap gap-x-8 gap-y-3 overflow-y-auto max-h-[16rem]">
          <div className="border rounded-3xl text-center place-content-center h-10 px-[6rem]">fuck</div>
          <div className="border rounded-3xl text-center place-content-center h-10 px-[6rem]">fuck</div>
          <div className="border rounded-3xl text-center place-content-center h-10 px-[6rem]">fuck</div>
          <div className="border rounded-3xl text-center place-content-center h-10 px-[6rem]">fuck</div>
          <div className="border rounded-3xl text-center place-content-center h-10 px-[6rem]">fuck</div>
          <div className="border rounded-3xl text-center place-content-center h-10 px-[6rem]">fuck</div>
          <div className="border rounded-3xl text-center place-content-center h-10 px-[6rem]">fuck</div>
          <div className="border rounded-3xl text-center place-content-center h-10 px-[6rem]">fuck</div>
          <div className="border rounded-3xl text-center place-content-center h-10 px-[6rem]">fuck</div>
          <div className="border rounded-3xl text-center place-content-center h-10 px-[6rem]">fuck</div>
          <div className="border rounded-3xl text-center place-content-center h-10 px-[6rem]">fuck</div>
          <div className="border rounded-3xl text-center place-content-center h-10 px-[6rem]">fuck</div>
          <div className="border rounded-3xl text-center place-content-center h-10 px-[6rem]">fuck</div>
          <div className="border rounded-3xl text-center place-content-center h-10 px-[6rem]">fuck</div>
        </div>

      </div>

      {/* Next Button */}
      <div className="">
        
      </div>
    </div>
  );
};

export default ContactForm;
