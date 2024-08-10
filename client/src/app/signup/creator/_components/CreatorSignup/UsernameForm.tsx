"use client";

import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { userInfo } from "@/redux/slices/signUp-slice";
import { useAppSelector } from "@/redux/store";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

interface UsernameFormProps {
  register: any;
  errors: any;
  getValues: any;
}

const UsernameForm = ({ register, errors, getValues }: UsernameFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  let currentStep = useAppSelector(
    (state) => state.signUpReducer.value.currentStep
  );

  const onNext = () => {
    dispatch(userInfo({ username: getValues("userName") }));
    dispatch(userInfo({ currentStep: currentStep + 1 }));
  };

  const isDisabled = !getValues("userName") || !!errors.userName;

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
            className="input-md w-full input-focus-primary"
            id="userName"
            name="userName"
            autoComplete="name"
            onKeyDown={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
            {...register("userName")}
          />
          <p className="mt-1 text-sm text-red-400 min-h-5">
            {errors.userName?.message}
          </p>
        </label>
      </div>

      {/* Next Button */}
      <div className="self-end">
      <div
          onClick={onNext}
          className={`py-3 px-6 flex items-center justify-center ${
            isDisabled ? "primary-btn-disabled" : "primary-btn"
          }`}
          style={{
            pointerEvents: isDisabled ? "none" : "auto",
          }}>
          Next
          <ArrowForwardIcon style={{ marginLeft: "8px" }} />
        </div>
      </div>
    </div>
  );
};

export default UsernameForm;
