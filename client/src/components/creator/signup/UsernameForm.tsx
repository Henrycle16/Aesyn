"use client";

import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { userInfo } from "@/redux/slices/user-slice";
import { useAppSelector } from "@/redux/store";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

interface UsernameFormProps {
  register: any;
  errors: any;
  getValues: any;
}

const UsernameForm = ({
  register,
  errors,
  getValues,
}: UsernameFormProps) => {

  const dispatch = useDispatch<AppDispatch>();
  let currentStep = useAppSelector((state) => state.userInfoReducer.value.currentStep);

  const onNext = () => {
    dispatch(userInfo({ username: getValues('userName') }));
    dispatch(userInfo({ currentStep: currentStep + 1 }));
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
            className="input input-bordered w-full focus:outline-none focus:ring-1 focus:ring-inset focus:ring-blue-500 focus:border-blue-500 rounded-md"
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
