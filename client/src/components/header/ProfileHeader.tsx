"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ThreeMenu from "./creator/ThreeMenu";
import CreatorAvatar from "./creator/CreatorAvatar";
import { useSession } from "next-auth/react";
import { getUserById } from "@/actions/userApi";

import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { logIn } from "@/redux/slices/auth-slice";

const ProfileHeader = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  const [isMounted, setIsMounted] = useState(false);

  const getUserInfo = async () => {
    if (session?.user.id && status === "authenticated") {
      await getUserById(session.user.id).then((res) => {
        if (res.status === 200) {
          dispatch(
            logIn({
              isAuth: true,
              email: res.data.email,
              name: session.user.name,
              userId: session.user.id,
            })
          );
        }
      });
    }
  };

  useEffect(() => {
    setIsMounted(true);
    getUserInfo();
  }, [session]);

  if (!isMounted) {
    return null;
  }

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
