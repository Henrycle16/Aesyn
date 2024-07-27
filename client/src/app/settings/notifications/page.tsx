"use client";

import { useState } from "react";
import SettingTabs from "@/components/settings/Tabs"
import Notifications from "@/components/settings/Notifications";

export default function AccountPage() {
  return (
    <div className="grid grid-cols-8 my-10 flex flex-col gap-10 w-[77.5rem]">
      {/* Tabs */}
      <div className="col-start-2 col-span-2">
        <SettingTabs value={2}></SettingTabs>
      </div>
      {/* Settings Content */}
      <div className="col-span-4"> 
        <Notifications></Notifications>
      </div>
    </div>
  );
}
