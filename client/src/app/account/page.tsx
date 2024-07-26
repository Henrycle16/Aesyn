"use client";

import SettingTabs from "@/components/account/Tabs"
import MyAccount from "@/components/account/MyAccount";

export default function AccountPage() {
  return (
    <div className="grid grid-cols-8 my-10 flex flex-col gap-10 w-[77.5rem]">
      {/* Tabs */}
      <div className="col-start-2 col-span-2">
        <SettingTabs></SettingTabs>
      </div>
      {/* Settings Content */}
      <div className="col-span-4"> 
        <MyAccount></MyAccount>
      </div>
    </div>
  );
}
