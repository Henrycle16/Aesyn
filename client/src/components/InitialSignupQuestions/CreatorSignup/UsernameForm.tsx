"use client";

import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import axios from "axios";
import { error } from "console";

interface UsernameFormProps {
  handleNextStep: () => void;
  handleFormChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  formData: any;
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
      axios
        .get(`http://localhost:5000/api/users/username/${username}`)
        .then((res) => {
          if (res.data) {
            setErrorMessage("Username already exists");
            setNextButtonDisabled(true);
          } else {
            setErrorMessage("");
            setNextButtonDisabled(false);
          }
        })
        .catch((error) => {
          setErrorMessage("");
          setNextButtonDisabled(true);
        });
    } else {
      setErrorMessage("");
      setNextButtonDisabled(true);
    }
  }, 500);

  return (
    <div className="grid grid-cols-9 grid-rows-9 gap-4 w-full h-full">
      {/* Handles Username*/}
      <div className="col-start-3 col-span-5 row-start-4 row-span-3 justify-center items-center">
        <label className="form-control w-full mb-2">
          <div className="label">
            <span className="label-text font-bold text-xl mb-5">Username</span>
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
      <div className="col-start-8 col-span-1 row-start-8 row-span-1 justify-end pt-5">
        <Button
          disabled={isNextButtonDisabled}
          onClick={handleNextStep}
          type="button"
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

export default UsernameForm;
