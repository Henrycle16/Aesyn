"use client";

import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface UsernameFormProps {
  handleNextStep: () => void;
  register: any;
  errors: any;
  getValues: any;
}

const UsernameForm = ({
  handleNextStep,
  register,
  errors,
  getValues,
}: UsernameFormProps) => {

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
            id="userName"
            {...register("userName")}
          />
          {errors.userName?.message && (
            <p className="mt-1 text-sm text-red-400">
              {errors.userName.message}
            </p>
          )}
        </label>
      </div>

      {/* Next Button */}
      <div className="self-end">
        <Button
          disabled={!getValues('userName') || !!errors.userName}
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
