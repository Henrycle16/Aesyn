"use client";
import LoginComponent from "@/components/user/Login";
import Image from "next/image";
import login from "../../../public/login.jpg"


export default function SignUp() {
  return (
    <div className="flex justify-between px-12 max-lg:flex-col max-lg:items-center gap-2">
      <div className="max-w-xl">
        <LoginComponent />
      </div>

      <div className="max-w-lg grid place-items-center">
        <Image src={login} alt="image"></Image>
      </div>
    </div>
  );
}
