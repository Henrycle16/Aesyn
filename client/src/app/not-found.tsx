import LandingHeader from "@/components/header/LandingHeader";
import React from "react";
import Image from "next/image";
import notFound from "../../public/404-image.png";
import Link from "next/link";
const NotFound = () => {
  return (
    <>
      <h1 className="mx-auto mt-20 font-semibold">
        Whoopsies! Something went wrong.
      </h1>
      <Image
        src={notFound}
        width={530}
        height={530}
        alt="404-Page Not Found"
        className="mx-auto my-5"
      />

      <div className="mx-auto my-5">
        Looks like you wondered off! The page you are looking for doesn&apos;t
        exist.
      </div>
      <div className="flex justify-center mx-auto items-center">
        <Link
          href={"/"}
          className="ts1-bg mt-10 text-white ts1-bg border-0 py-1 px-4 focus:outline-none hover:ts2-bg rounded text-sm"
        >
          Back to Home Page
        </Link>
      </div>
    </>
  );
};

export default NotFound;
