"use client";

import React, { useState } from "react";
import axios from "axios";
import { error } from "console";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface UsernameFormProps {
  formData: any;
  handleFormChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNextStep: () => void;
}

function debounce<F extends (...args: any[]) => any>(
  func: F,
  wait: number
): (...args: Parameters<F>) => void {
  let timeout: NodeJS.Timeout | null;
  return function executedFunction(...args: Parameters<F>) {
    const later = () => {
      clearTimeout(timeout!);
      func(...args);
    };
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

const UsernameForm = ({
  formData,
  handleFormChange,
  handleNextStep,
}: UsernameFormProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isNextButtonDisabled, setNextButtonDisabled] = useState(true);

  const checkUsername = debounce((username) => {
    if (username.length > 3) {
      setNextButtonDisabled(false);
      // axios
      //   .get(`http://localhost:5000/api/users/username/${username}`)
      //   .then((res) => {
      //     if (res.data) {
      //       setErrorMessage("Username already exists");
      //       setNextButtonDisabled(true);
      //     } else {
      //       setErrorMessage("");
      //       setNextButtonDisabled(false);
      //     }
      //   })
      //   .catch((error) => {
      //     setErrorMessage("");
      //     setNextButtonDisabled(true);
      //   });
    } else {
      setErrorMessage("");
      setNextButtonDisabled(true);
    }
  }, 500);

  return (
    <div className="flex flex-col w-full">
      <div className="w-7/12 mx-auto my-auto">
        {/* Handles Username*/}
        <label className="form-control mb-2">
          <div className="label">
            <span className="label-text font-bold text-xl mb-1">Username</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            name="userName"
            value={formData.userName}
            onChange={(e) => {
              handleFormChange(e);
              checkUsername(e.target.value);
            }}
          />
        </label>
        <div className="mt-2 italic text-red-600">{errorMessage}</div>
      </div>
      
      {/* Next Button */}
      <div className="self-end">
        <Button
          // disabled={isNextButtonDisabled}
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

export default UsernameForm;
