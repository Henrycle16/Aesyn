"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface ContactFormProps {
  handleNextStep: () => void;
  handlePrevStep: () => void;
  handleFormChange: (event: any) => void;
  formData: any;
}

const ContactForm = ({
  formData,
  handleFormChange,
  handleNextStep,
  handlePrevStep,
}: ContactFormProps) => {
  const [errors, setErrors] = useState({
    contactPersonName: "",
    contactPhoneNumber: "",
    contactEmail: "",
  });

  const validateName = (name: string) => /^[A-Za-z\s]+$/.test(name);

  const validatePhone = (phone: string) => /^\d{10}$/.test(phone);
  
  const validateEmail = (email: string) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);


  const handleInputChange = (event: any) => {
  const { name, value } = event.target;
  
  let newValue = value;
  if (name === "contactPhoneNumber") {
    newValue = newValue.replace(/\D/g, "");
  } else if (name === "contactPersonName") {
    newValue = newValue.replace(/\d/g, "");
  }
  
  switch (name) {
    case "contactPersonName":
      setErrors(prev => ({
        ...prev, 
        contactPersonName: newValue && !validateName(newValue) ? "Invalid name" : ""
      }));
      break;
    case "contactPhoneNumber":
      setErrors(prev => ({
        ...prev, 
        contactPhoneNumber: newValue && !validatePhone(newValue) ? "Invalid phone number" : ""
      }));
      break;
    case "contactEmail":
      setErrors(prev => ({
        ...prev, 
        contactEmail: newValue && !validateEmail(newValue) ? "Invalid email" : ""
      }));
      break;
    default:
      break;
  }

  handleFormChange({ target: { name, value: newValue } });
};

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
            <span className="label-text font-bold text-xl">
              Primary Contact Full Name
            </span>
          </div>
          <input
            type="text"
            placeholder="Full Name"
            required
            className="input input-bordered w-full"
            name="contactPersonName"
            value={formData.contactPersonName}
            onChange={handleInputChange}
          />
          <p className="mt-2 italic text-red-600 error-message">{errors.contactPersonName}</p>
        </label>
        <label className="form-control w-full mb-6">
          <div className="label">
            <span className="label-text font-bold text-xl">
              Primary Contact Phone Number
            </span>
          </div>
          <input
            type="text"
            placeholder="(000) - 000 - 0000"
            required
            className="input input-bordered w-full"
            name="contactPhoneNumber"
            value={formData.contactPhoneNumber}
            onChange={handleInputChange}
            maxLength={10}
          />
          <p className="mt-2 italic text-red-600 error-message">{errors.contactPhoneNumber}</p>
        </label>
        <label className="form-control w-full mb-6">
          <div className="label">
            <span className="label-text font-bold text-xl">
              Primary Contact Email
            </span>
          </div>
          <input
            type="email"
            placeholder="Email Address"
            required
            className="input input-bordered w-full"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleInputChange}
          />
          <p className="mt-2 italic text-red-600 error-message">{errors.contactEmail}</p>
        </label>
      </div>

      {/* Next Button */}
      <div className="col-start-8 col-span-1 row-start-8 row-span-1 justify-end pt-5">
        <Button
          disabled={
            !formData.contactPersonName ||
            !formData.contactPhoneNumber ||
            !formData.contactEmail
          }
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
