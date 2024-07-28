import SmallFooter from "@/components/ui/footer/SmallFooter";
import ProfileHeader from "@/components/ui/header/ProfileHeader";
import SettingTabs from "./_components/SettingsTab";

export default function AccountLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProfileHeader />
      <main className="flex-1 mx-auto max-lg:py-5">
        <div className="w-[77.5rem] mt-20 flex justify-between">
          {/* Settings Tabs */}
          <SettingTabs />
          {/* Settings components */}
          <div className="w-[57.5rem] flex flex-col border border-red-500">
            {children}
          </div>
        </div>
      </main>
      <SmallFooter />
    </>
  );
}
