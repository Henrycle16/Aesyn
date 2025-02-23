import SmallFooter from "@/components/footer/SmallFooter";
import ProfileHeader from "@/components/header/ProfileHeader";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProfileHeader />
      <main className="flex-1 mx-auto max-lg:py-5">{children}</main>
      <SmallFooter />
    </>
  );
}
