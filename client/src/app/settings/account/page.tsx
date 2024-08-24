"use client";

import React, { useEffect, useState } from "react";
import PersonalInfo from "@/app/settings/account/_components/PersonalInfo";
import AccountManagement from "@/app/settings/account/_components/AccountManagement";
import Password from "@/app/settings/account/_components/Password";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { getUserById } from "@/actions/userApi";
import { profileDataInfo } from "@/redux/slices/profileData-slice";
import { useSession } from "next-auth/react";

import { useGetUserByIdQuery } from "@/services/userApi";

export default function AccountPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const session = useSession();
  const userId = session.data?.user.id;

  const { data, error, isLoading, isFetching, isUninitialized } = useGetUserByIdQuery(userId, {
    skip: !userId,
  });

  useEffect(() => {
    if (userId) {
      const getProfileInfo = async () => {
        try {
          const response = await getUserById(userId);
          dispatch(
            profileDataInfo({
              userId: response.data._id,
              communicationEmail: response.data.communicationEmail,
              marketingEmail: response.data.marketingEmail,
              messageEmail: response.data.messageEmail,
              securityEmail: response.data.securityEmail,
            })
          );
          setIsDataLoaded(true);
        } catch (error) {
          console.error(error);
        }
      };

      getProfileInfo();
    }
  }, [userId, dispatch]);
  
  if (isUninitialized || isLoading) {
    return <div>Loading...</div>; // Placeholder while data is loading
  }

  return (
    <>
      <h1 className="heading1 ts5-text">My Account</h1>
      {/* Personal Information Section */}
      <PersonalInfo />
      {/* Password Section */}
      <Password />
      {/* Account Management Section */}
      <AccountManagement />
    </>
  );
}
