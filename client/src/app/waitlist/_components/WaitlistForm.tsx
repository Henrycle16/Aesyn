"use client";

import { useState } from "react";
import { z } from "zod";
import { FormDataSchema } from "@/lib/zod-schemas/waitlistSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { addApplicant } from "@/actions/waitlistApi";

type Inputs = z.infer<typeof FormDataSchema>;
type Props = {
  setIsFormSubmitted: (value: boolean) => void;
};

export default function WaitlistForm({ setIsFormSubmitted }: Props) {
  const [isBrand, setIsBrand] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
    mode: "onChange",
  });

  // Add validation for Join as Brand/Creator buttons
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formData = {
      applicantType: isBrand ? "brand" : "creator",
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      questionairre: data.questionnaire,
    };

    try {
        if (!isClicked) {
          setError("applicantType", { type: "custom", message: "Join as* required" })
          return;
        } 
      const response = await addApplicant(formData);
      console.log(response.data);
      setIsFormSubmitted(true);
      setIsClicked(false);
    } catch (err) {
      console.log(err);
    }
    reset();
  };

  const joinAsBrandBtn = () => {
    setIsBrand(true);
    setIsClicked(true);
    clearErrors("applicantType");
  };
  const joinAsCreatorBtn = () => {
    setIsBrand(false);
    setIsClicked(true);
    clearErrors("applicantType");
  };

  const activeButtonStyle = "bg-gradient-to-r from-[#5B58EB] to-[#BB63FF] border-0"

  const gradientButtonStyle =
    "bg-gradient-to-r from-[#5B58EB] to-[#BB63FF] rounded-3xl h-[2.8125rem] py-2 px-5 text-sm font-bold hover:from-pink-500 hover:to-orange-500";

  const inputTextStyle =
    "w-full h-[2.8125rem] rounded-[0.3125rem] px-[0.9375rem] border-0 bg-[#645281] text-sm placeholder-white focus:ring-white focus:outline-none focus:ring-1";

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="w-[32.063rem] h-[41.813rem] flex flex-col text-white border border-[#D7D7D7] rounded-[0.9375rem] px-14 py-7 bg-gradient-to-br from-[#ffffff4d] to-[#ffffff26] from-0% to-100%"
    >
      {/* Title & Description */}
      <div className="mt-6">
        <h1 className="font-semibold text-2xl">Get Early Access!!</h1>
        <p className="text-sm mt-4">
          Be the first to experience our collaborative innovative platform and
          get notified when we launch!
        </p>
        {errors.applicantType?.message}
      </div>
      {/* Form Fields */}
      <div className="mt-6 flex flex-col gap-4">
        {/* Brand/Creator Select Btns */}
        <div className="">
          <label className="text-sm font-bold">Join as *</label>
          <div className="mt-1 flex gap-3">
            <button
              type="button"
              onClick={joinAsBrandBtn}
              className={`${isBrand && isClicked ? activeButtonStyle : "border-[3px]"} w-[6.563rem] h-[2.813rem] rounded-[36px] font-bold text-sm`}>
              Brand
            </button>
            <button
              type="button"
              onClick={joinAsCreatorBtn}
              className={`${!isBrand && isClicked ? activeButtonStyle : "border-[3px]"} w-[6.563rem] h-[2.813rem] rounded-[36px] font-bold text-sm`}>
              Creator
            </button>
          </div>
        </div>
        {/* First Name */}
        <div className="mt-4">
          <input
            type="text"
            className={`${inputTextStyle}`}
            placeholder="First Name *"
            id="firstName"
            autoComplete="given-name"
            {...register("firstName")}
          />
        </div>
        {/* Last Name */}
        <div>
          <input
            type="text"
            className={`${inputTextStyle}`}
            placeholder="Last Name *"
            id="lastName"
            autoComplete="family-name"
            {...register("lastName")}
          />
        </div>
        {/* Email */}
        <div>
          <input
            type="email"
            className={`${inputTextStyle}`}
            placeholder="Email Address *"
            id="email"
            autoComplete="email"
            {...register("email")}
          />
        </div>
        {/* Questionnaire */}
        <div>
          <select 
            id="questionnaire" 
            className={`${inputTextStyle}`}
            defaultValue=""
            {...register("questionnaire", { required: true })}
          >
            <option value="" disabled>What are you most excited about?</option>
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
          </select>
        </div>
      </div>
      {/* Submit Button */}
      <div className="mt-auto">
        <button type="submit" className={`${gradientButtonStyle} w-full`}>
          Join Waitlist
        </button>
      </div>
    </form>
  );
}
