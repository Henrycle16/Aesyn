import SmallFooter from "@/components/footer/SmallFooter";
import ProfileHeader from "@/components/header/ProfileHeader";

export default function ProfileLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProfileHeader />
      <main className="flex-1 w-full">{children}</main>
      <SmallFooter />
    </>
  );
}