"use client";

import React, { useEffect } from "react";
import PersonalInformation from "./_components/PersonalInfo";
import Password from "./_components/Password";
import AccountManagement from "./_components/AccountManagement";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { getUserById } from "@/actions/userApi";
import { profileDataInfo } from "@/redux/slices/profileData-slice";
import { useSession } from "next-auth/react";


export default function AccountPage() {
  const dispatch = useDispatch<AppDispatch>();
  const session = useSession();
  const userId = session.data?.user.id;

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
        } catch (error) {
          console.error(error);
        }
      };

      getProfileInfo();
    }
  }, [userId, dispatch]);

  return (
    <>
      <h1 className="heading1 ts5-text">My Account</h1>
      {/* Personal Information Section */}
      <PersonalInformation />
      {/* Password Section */}
      <Password />
      {/* Account Management Section */}
      <AccountManagement />
    </>
  );
}
