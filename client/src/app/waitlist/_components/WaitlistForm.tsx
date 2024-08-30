"use client";

import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import PersonPinOutlinedIcon from "@mui/icons-material/PersonPinOutlined";
import Button from "@mui/material/Button";
import { z } from "zod";
import { FormDataSchema } from "@/lib/zod-schemas/waitlistSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

import { useAppSelector } from "@/redux/store";
import Link from "next/link";
import { addApplicant } from "@/actions/waitlistApi";

import { showWaitlistSuccessToast } from "@/utils/toast/toastEmitters";

type Inputs = z.infer<typeof FormDataSchema>;

export default function WaitlistForm() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
    mode: "onChange",
  });

  const isBrand = useAppSelector(
    (state) => state.signUpReducer.value.isBrand
  );

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formData = {
      applicantType: isBrand ? "brand" : "creator",
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email
    };

    try {
      const response = await addApplicant(formData);
      console.log(response.data);
      setIsFormSubmitted(true);
      showWaitlistSuccessToast();

    } catch (err) {
      console.log(err);
    }
    // reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col border border-gray-300 rounded-2xl md:px-20 px-5 gap-1 w-[25rem]"
    >
      {/* Form Header */}
      <div className="mx-auto mt-16 flex flex-col items-center">
        <Avatar className="m-1 ts1-bg">
          <PersonPinOutlinedIcon />
        </Avatar>
        <h1 className="text-2xl">Waitlist Sign Up</h1>
      </div>

      {/* Input Fields */}
      <div className="mt-5">
        <input
          type="text"
          className="input-md w-full input-focus-primary"
          placeholder="First Name*"
          id="firstName"
          {...register("firstName")}
          autoFocus
          autoComplete="given-name"
          disabled={isFormSubmitted}
        />
        <p className="mt-1 text-sm min-h-5 ts8-text">
          {errors.firstName?.message}
        </p>
      </div>
      <div>
        <input
          type="text"
          className="input-md w-full input-focus-primary"
          placeholder="Last Name*"
          id="lastName"
          {...register("lastName")}
          autoComplete="family-name"
          disabled={isFormSubmitted}
        />
        <p className="mt-1 text-sm min-h-5 ts8-text">
          {errors.lastName?.message}
        </p>
      </div>
      <div>
        <input
          type="email"
          className="input-md w-full input-focus-primary"
          placeholder="Email Address*"
          id="email"
          {...register("email")}
          autoComplete="email"
          disabled={isFormSubmitted}
        />
        <p className="mt-1 text-sm min-h-5 ts8-text">
          {errors.email?.message}
        </p>
      </div>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        className="py-2 ts1-bg mt-5"
        disabled={isFormSubmitted}
      >
        Sign Up
      </Button>

      <div className="flex pt-16 pb-1">
        <p className="mx-auto text-sm g4-text">
          Copyright ©{" "}
          <Link href={"/"} className="g4-text">
            ShareFluence
          </Link>{" "}
          {new Date().getFullYear()}.
        </p>
      </div>
      
    </form>
  )
}