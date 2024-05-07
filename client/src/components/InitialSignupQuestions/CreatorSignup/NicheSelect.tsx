"use client";

import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
interface NicheSelectProps {
  formData: any;
  handleNextStep: () => void;
  handleFormChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ContactForm = ({
  formData,
  handleNextStep,
  handleFormChange,
}: NicheSelectProps) => {
  return (
    <div className="flex flex-col w-full">
      
      <div className="w-9/12 mx-auto my-auto">
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
          <div className="border rounded-3xl text-center place-content-center h-10 px-[6.4rem]">fuck</div>
          <div className="border rounded-3xl text-center place-content-center h-10 px-[6.4rem]">fuck</div>
          <div className="border rounded-3xl text-center place-content-center h-10 px-[6.4rem]">fuck</div>
          <div className="border rounded-3xl text-center place-content-center h-10 px-[6.4rem]">fuck</div>
          <div className="border rounded-3xl text-center place-content-center h-10 px-[6.4rem]">fuck</div>
          <div className="border rounded-3xl text-center place-content-center h-10 px-[6.4rem]">fuck</div>
          <div className="border rounded-3xl text-center place-content-center h-10 px-[6.4rem]">fuck</div>
          <div className="border rounded-3xl text-center place-content-center h-10 px-[6.4rem]">fuck</div>
          <div className="border rounded-3xl text-center place-content-center h-10 px-[6.4rem]">fuck</div>
          <div className="border rounded-3xl text-center place-content-center h-10 px-[6.4rem]">fuck</div>
          <div className="border rounded-3xl text-center place-content-center h-10 px-[6.4rem]">fuck</div>
          <div className="border rounded-3xl text-center place-content-center h-10 px-[6.4rem]">fuck</div>
          <div className="border rounded-3xl text-center place-content-center h-10 px-[6.4rem]">fuck</div>
          <div className="border rounded-3xl text-center place-content-center h-10 px-[6.4rem]">fuck</div>
        </div>

      </div>

      {/* Next Button */}
      <div className="self-end">
        <Button
          // disabled={!formData.niche.length}
          onClick={handleNextStep}
          type="button"
          variant="contained"
          className="bg-muiblue py-3 px-6"
          endIcon={<ArrowForwardIcon />}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ContactForm;
