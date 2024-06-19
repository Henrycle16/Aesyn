"use client";
import LoginComponent from "@/components/user/Login";
import Image from "next/image";
import login from "../../../public/login.jpg"


export default function SignUp() {
  return (
    <div className="flex justify-between px-12 max-lg:flex-col max-lg:items-center gap-2">
      <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
        <LoginComponent />
      </div>

      <div className="max-w-lg grid place-items-center">
        <Image src={login} alt="image"></Image>
      </div>
    </div>
  );
}
