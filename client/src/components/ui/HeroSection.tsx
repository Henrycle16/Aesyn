"use client"

import Image from "next/image";
import Link from "next/link";

import { userInfo } from "@/redux/slices/signUp-slice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

const HeroSection = () => {
  const dispatch = useDispatch<AppDispatch>();

  const onClickCreator = () => {
    dispatch(userInfo({ isCreator: true, isBrand: false }));
  }
  
  const onClickBrand = () => {
    dispatch(userInfo({ isBrand: true, isCreator: false }));
  }

  return (
    <section className="flex flex-col items-center text-gray-600 body-font md:flex-row">
      <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
          ShareFluence
        </h1>
        <p className="mb-8 leading-relaxed">
          {" "}
          At ShareFluence, we are redefining digital marketing by seamlessly
          connecting brands with creators utilizing cutting-edge AI for optimal
          collaborations. We empower businesses, regardless of size, with
          insightful metrics and help facilitate informed decisions. Within our
          dynamic ecosystem, we cultivate meaningful connections that drive
          success for both brands and creators in the ever-growing landscape of
          social media.{" "}
        </p>
        <div className="flex justify-center">
          <Link
            onClick={onClickBrand}
            href={"/waitlist"}
            className="inline-flex text-white ts1-bg border-0 py-2 px-6 focus:outline-none hover:ts2-bg rounded text-lg"
          >
            Join as Brand!
          </Link>
          <Link
            onClick={onClickCreator}
            href={"/waitlist"}
            className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
          >
            Join as Creator!
          </Link>
        </div>
      </div>
      <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
        <Image
          src="https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="hero"
          className="object-cover object-center rounded"
          width={820}
          height={700}
          priority={true}
        />
      </div>
    </section>
  );
};

export default HeroSection;
