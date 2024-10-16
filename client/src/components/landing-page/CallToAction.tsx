"use client";

import Link from "next/link";

const CallToAction = () => {
  return (
    <div className="flex flex-col items-center max-w-5xl pt-32 pb-32">
      <h1 className="text-[60px] text-center leading-[4rem] font-semibold">
        You don&apos;t want to miss out!
      </h1>
      <p className="text-center mt-5 mb-16 text-[20px] max-w-4xl">
        Join the waitlist to get early access and receive exclusive perks.
      </p>
      <Link href="/waitlist " className="gradient-button">
        Join Waitlist
      </Link>
    </div>
  );
};

export default CallToAction;
