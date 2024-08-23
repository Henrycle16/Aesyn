"use client"

import React, { useEffect } from "react";
import Link from "next/link";
import ThreeMenu from "./creator/ThreeMenu";
import CreatorAvatar from "./creator/CreatorAvatar";
import { useSession } from "next-auth/react";

import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { logIn } from "@/redux/slices/auth-slice";

const ProfileHeader = () => {
  const session = useSession();
  const dispatch = useDispatch<AppDispatch>();

  const getUserInfo = async () => {
    if (session.data && session.status === "authenticated") {
      dispatch(
        logIn({
          isAuth: true,
          name: session.data.user.name,
          email: session.data.user.email,
          userId: session.data.user.id,
        })
      );
    }

  };

  useEffect(() => {
    getUserInfo();
  }, [session.data])

  return (
    <header className="flex flex-wrap px-16 pt-4 flex-col md:flex-row items-center">
      <Link href={"/"} className="text-2xl text-gray-900 font-semibold">
        ShareFluence
      </Link>
      <div className="flex ml-40 items-center">
        <ThreeMenu />
      </div>
      <div className="flex ml-auto items-center">
        <CreatorAvatar />
      </div>
    </header>
  );
};

export default ProfileHeader;
