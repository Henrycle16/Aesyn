import SmallFooter from "@/components/ui/footer/SmallFooter";
import ProfileHeader from "@/components/ui/header/ProfileHeader";

export default function AccountLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProfileHeader />
      <main className="flex-1 mx-auto max-lg:py-5">
       {children}
      </main>
      <SmallFooter />
    </>
  );
}
