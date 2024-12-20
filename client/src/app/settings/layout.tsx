import SmallFooter from "@/components/footer/SmallFooter";
import ProfileHeader from "@/components/header/ProfileHeader";
import SettingTabs from "./_components/SettingsTab";

export default function AccountLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProfileHeader />
      <main className="flex-1 mx-auto max-lg:py-5 mb-10">
        <div className="w-[77.5rem] mt-20 flex justify-between">
          {/* Settings Tabs */}
          <SettingTabs />
          {/* Settings components */}
          <div className="w-[57.5rem] mt-7 flex flex-col gap-6">{children}</div>
        </div>
      </main>
      <SmallFooter />
    </>
  );
}
