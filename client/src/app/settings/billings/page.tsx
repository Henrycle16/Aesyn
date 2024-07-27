"use client";

import SettingTabs from "@/components/settings/Tabs"
import Billings from "@/components/settings/Billings";

export default function AccountPage() {


  return (
    <div className="grid grid-cols-8 my-10 flex flex-col gap-10 w-[77.5rem]">
      {/* Tabs */}
      <div className="col-start-2 col-span-2">
      <SettingTabs value={1}></SettingTabs>
      </div>
      {/* Settings Content */}
      <div className="col-span-4"> 
        <Billings></Billings>
      </div>
    </div>
  );
}
