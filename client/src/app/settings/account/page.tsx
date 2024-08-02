"use client"

import PersonalInfo from "@/app/settings/account/_components/PersonalInfo";
import AccountManagement from "@/app/settings/account/_components/AccountManagement"
import Password from "@/app/settings/account/_components/Password";

export default function AccountPage() {
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
