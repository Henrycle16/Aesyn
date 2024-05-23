"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface UsernameFormProps {
  formData: any;
  handleFormChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNextStep: () => void;
  setUsernameValid: React.Dispatch<React.SetStateAction<boolean>>;
  isUsernameValid: boolean;
}

const UsernameForm = ({
  formData,
  handleFormChange,
  handleNextStep,
  isUsernameValid,
  setUsernameValid,
}: UsernameFormProps) => {
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (formData.userName.length <= 3) {
      setUsernameValid(false);
    };

    const checkUsername = async (username: string) => {
      try {
        const result = await axios.get(
          `http://localhost:5000/api/users/username/${username}`
        );
        if (result.data) {
          setErrorMessage("Username already exists");
          setUsernameValid(false);
          return;
        }
        setErrorMessage("");
        setUsernameValid(true);
      } catch (error) {
        console.error("Error fetching username: ", error);
      }
    };

    const debouncedValidation = _.debounce((username) => {
      checkUsername(username);
    }, 500);

    if (formData.userName.length > 3) {
      debouncedValidation(formData.userName);
    }
  }, [formData.userName, isUsernameValid, setUsernameValid]);

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
            }}
          />
        </label>
        <div className="mt-2 italic text-red-600">{errorMessage}</div>
      </div>

      {/* Next Button */}
      <div className="self-end">
        <Button
          disabled={!isUsernameValid}
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
