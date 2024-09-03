"use client";

import { useState } from "react";

export default function WaitlistForm() {
  const [isBrand, setIsBrand] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const joinAsBrandBtn = () => {
    setIsBrand(true);
    setIsClicked(true);
  };
  const joinAsCreatorBtn = () => {
    setIsBrand(false);
    setIsClicked(true);
  };

  const activeButtonStyle = "bg-gradient-to-r from-[#5B58EB] to-[#BB63FF] border-0"

  const gradientButtonStyle =
    "bg-gradient-to-r from-[#5B58EB] to-[#BB63FF] rounded-3xl h-[2.8125rem] py-2 px-5 text-sm font-bold hover:from-pink-500 hover:to-orange-500";

  const inputTextStyle =
    "w-full h-[2.8125rem] rounded-[0.3125rem] px-[0.9375rem] border-0 bg-[#645281] text-sm placeholder-white focus:ring-white focus:outline-none focus:ring-1";

  return (
    <form className="w-[32.063rem] h-[41.813rem] flex flex-col text-white border border-[#D7D7D7] rounded-[0.9375rem] px-14 py-7 bg-gradient-to-br from-[#ffffff4d] to-[#ffffff26] from-0% to-100%">
      {/* Title & Description */}
      <div className="mt-6">
        <h1 className="font-semibold text-2xl">Get Early Access!!</h1>
        <p className="text-sm mt-4">
          Be the first to experience our collaborative innovative platform and
          get notified when we launch!
        </p>
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
          />
        </div>
        {/* Questionairre */}
        <div>
          <select name="" id="" className={`${inputTextStyle}`}>
            <option value="">What are you most excited about?</option>
            <option value="">Option 1</option>
            <option value="">Option 2</option>
            <option value="">Option 3</option>
          </select>
        </div>
      </div>
      {/* Submit Button */}
      <div className="mt-auto">
        <button type="button" className={`${gradientButtonStyle} w-full`}>
          Join Waitlist
        </button>
      </div>
    </form>
  );
}
