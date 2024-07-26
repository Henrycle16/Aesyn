"use client";

import SettingTabs from "@/components/account/Tabs"
import MyAccount from "@/components/account/MyAccount";

export default function AccountPage() {
  return (
    <div className="my-10 flex flex-col gap-10 w-[77.5rem]">
      {/* Tabs */}
      <div>
        <SettingTabs></SettingTabs>
      </div>
      {/* Settings Content */}
      <div>
        <MyAccount></MyAccount>
      </div>
    </div>
  );
}
