"use client";

import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { creatorInfo } from "@/redux/slices/creator-slice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";

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

  const dispatch = useDispatch<AppDispatch>();
  let currentStep = useAppSelector((state) => state.creatorInfoReducer.value.currentStep);

  const onNext = () => {
    dispatch(creatorInfo({ username: getValues('userName') }));
    dispatch(creatorInfo({ currentStep: currentStep + 1 }));
    
    handleNextStep();
  }

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
            onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}
            {...register("userName")}
          />
          <p className="mt-1 text-sm text-red-400 min-h-5">
            {errors.userName?.message}
          </p>
        </label>
      </div>

      {/* Next Button */}
      <div className="self-end">
        <Button
          disabled={!getValues('userName') || !!errors.userName}
          onClick={onNext}
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
