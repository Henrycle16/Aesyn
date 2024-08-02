"use client"

import PersonalInformation from "./_components/PersonalInfo";
import PersonalInfo from "@/components/settings/myAccount/PersonalInfo";
import AccountManagement from "@/components/settings/myAccount/AccountManagement"
import Password from "@/components/settings/myAccount/Password";

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
