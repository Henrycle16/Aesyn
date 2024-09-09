"use client";

import { useState } from "react";
import { z } from "zod";
import { FormDataSchema } from "@/lib/zod-schemas/waitlistSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { addApplicant } from "@/actions/waitlistApi";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import "@/styles/gradientButton.css";

type Inputs = z.infer<typeof FormDataSchema>;
type Props = {
  setIsFormSubmitted: (value: boolean) => void;
};

export default function WaitlistForm({ setIsFormSubmitted }: Props) {
  const [isBrand, setIsBrand] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formData = {
      applicantType: isBrand ? "brand" : "creator",
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      questionairre: data.questionnaire,
    };

    try {
      const response = await addApplicant(formData);
      console.log(response.data);
      setIsFormSubmitted(true);
      setIsClicked(false);
    } catch (err) {
      console.log(err);
    }
    reset();
  };

  const joinAsOnClick = (isBrand: boolean) => {
    isBrand ? setIsBrand(true) : setIsBrand(false);
    setIsClicked(true);
  };

  const activeButtonStyle = "bg-gradient-to-r from-[#5B58EB] to-[#BB63FF]";

  const gradientButtonStyle =
    "bg-gradient-to-r from-[#5B58EB] via-[#BB63FF] to-[#5B58EB] rounded-3xl h-[2.8125rem] py-2 px-5 text-sm font-bold";

  const inputTextStyle =
    "w-full h-[2.8125rem] rounded-[0.3125rem] px-[0.9375rem] border-0 bg-[#645281] text-sm placeholder-white focus:ring-opacity-50 focus:ring-white focus:outline-none focus:ring-1";

  const errorInputBoxStyle =
    "bg-[#7E5151] border-[#A91111] w-full h-[2.8125rem] rounded-[0.3125rem] px-[0.9375rem] text-sm placeholder-white outline-none";

  const errorStyle = "text-xs text-red-500 absolute mt-1";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[32.063rem] h-[41.813rem] flex flex-col text-white border border-[#D7D7D7] rounded-[0.9375rem] px-[3.75rem] py-7 bg-gradient-to-br from-[#ffffff4d] to-[#ffffff26] from-0% to-100%">
      {/* Title & Description */}
      <div className="mt-5">
        <h1 className="font-semibold text-2xl">Get Early Access!!</h1>
        <p className="text-sm mt-3.5 leading-6">
          Be the first to experience our collaborative innovative platform and
          get notified when we launch!
        </p>
      </div>
      {/* Form Fields */}
      <div className="mt-6 flex flex-col gap-[1.875rem]">
        {/* Brand/Creator Select Btns */}
        <div>
          <label className="text-sm font-bold">Join as *</label>
          <div className="mt-1 flex gap-3 font-bold text-sm">
            <button
              type="button"
              onClick={() => joinAsOnClick(true)}
              className={`${
                isBrand && isClicked
                  ? activeButtonStyle
                  : "btn-gradient flex items-center"
              } w-[6.563rem] h-[2.813rem] rounded-[36px]`}>
              <span className="px-[1.65rem]">Brand</span>
            </button>
            <button
              type="button"
              onClick={() => joinAsOnClick(false)}
              className={`${
                !isBrand && isClicked
                  ? activeButtonStyle
                  : "btn-gradient flex items-center"
              } w-[6.563rem] h-[2.813rem] rounded-[36px]`}>
              <span className="px-[1.3425rem]">Creator</span>
            </button>
          </div>
          <p className={errorStyle}>{errors.applicantType?.message}</p>
        </div>
        {/* First Name */}
        <div>
          <input
            type="text"
            className={`${
              errors.firstName?.message ? errorInputBoxStyle : inputTextStyle
            }`}
            placeholder="First Name *"
            id="firstName"
            autoComplete="given-name"
            {...register("firstName")}
          />
          <p className={errorStyle}>{errors.firstName?.message}</p>
        </div>
        {/* Last Name */}
        <div>
          <input
            type="text"
            className={`${
              errors.lastName?.message ? errorInputBoxStyle : inputTextStyle
            }`}
            placeholder="Last Name *"
            id="lastName"
            autoComplete="family-name"
            {...register("lastName")}
          />
          <p className={errorStyle}>{errors.lastName?.message}</p>
        </div>
        {/* Email */}
        <div>
          <input
            type="email"
            className={`${
              errors.email?.message ? errorInputBoxStyle : inputTextStyle
            }`}
            placeholder="Email Address *"
            id="email"
            autoComplete="email"
            {...register("email")}
          />
          <p className={errorStyle}>{errors.email?.message}</p>
        </div>
        {/* Questionnaire */}
        <div>
          <div
            className={`${
              errors.questionnaire?.message &&
              "border border-[#A91111] rounded-[0.3125rem]"
            } relative`}>
            <select
              id="questionnaire"
              className={`${
                errors.questionnaire?.message
                  ? errorInputBoxStyle
                  : inputTextStyle
              } px-[0.6rem] appearance-none`}
              defaultValue=""
              onClick={() => setIsOpen(!isOpen)}
              {...register("questionnaire", {
                required: true,
                onBlur: () => isOpen && setIsOpen(!isOpen),
              })}>
              <option value="" disabled>
                What are you most excited about?
              </option>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ArrowDropDownIcon
                className={`transform transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>
          <p className={errorStyle}>{errors.questionnaire?.message}</p>
        </div>
      </div>
      {/* Submit Button */}
      <div className="mt-auto mb-1">
        <button
          type="submit"
          className={`${gradientButtonStyle} w-full [background-size:200%_100%] [transition:background_0.15s_ease-in-out] hover:[background-position:100%_center]`}>
          Join Waitlist
        </button>
      </div>
    </form>
  );
}
