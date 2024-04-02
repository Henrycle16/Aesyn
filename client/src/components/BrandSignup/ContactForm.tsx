"use client";

import React, { useState }  from "react";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface ContactFormProps {
  onBack: () => void;
  onNext: () => void;
  onSave: (info: any) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onBack, onNext, onSave }) => {

  const [primaryName, setPrimaryName] = useState("");
  const [primaryNumber, setPrimaryNumber] = useState("");
  const [primaryEmail, setPrimaryEmail] = useState("");

  const handleNext = () => {
    onSave({ primaryName, primaryNumber, primaryEmail });
    onNext();
  };

  return (
    <div className="grid grid-cols-9 grid-rows-9 gap-4 w-full h-full">
      <div className="col-start-1 col-span-1 row-start-1 row-span-1 justify-end">
        <Button
          onClick={onBack}
          variant="text"
          startIcon={<ArrowBackIcon />}
          className="col-span-1"
          sx={{ padding: "12px 24px" }}
        >
          back
        </Button>
      </div>
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
            autoFocus
            className="input input-bordered w-full"
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
            autoFocus
            className="input input-bordered w-full"
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
            autoFocus
            className="input input-bordered w-full"
          />
        </label>
      </div>
      <div className="col-start-8 col-span-1 row-start-8 row-span-1 justify-end">
        <Button
          onClick={handleNext}
          type="submit"
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
