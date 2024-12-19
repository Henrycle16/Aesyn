"use client";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center max-w-5xl mb-64">
      <h1 className="text-[60px] text-center leading-[4rem] font-semibold">
        Connecting <span className="gradient-text">brands</span> and{" "}
        <span className="gradient-text">creators</span> with the power of{" "}
        <span className="gradient-text">AI</span>
      </h1>
      <p className="text-center mt-[2.3rem] mb-16 text-[20px] max-w-3xl">
        Expand your reach, refine your campaigns, and build lasting partnerships
        with tools designed to save you time and deliver results. <br />
        All in one seamless platform
      </p>
      <Link href="/waitlist" className="gradient-button">
        Join Waitlist
      </Link>
    </div>
  );
};

export default HeroSection;
