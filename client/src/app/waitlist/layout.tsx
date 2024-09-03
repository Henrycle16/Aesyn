import Header from "@/components/header/Header";
import SmallFooter from "@/components/footer/SmallFooter";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#36035F] from-38% via-[#240B4D] via-50% to-[#000000] to-76%">
      <Header />
      <main className="container flex-1 flex items-center justify-center mx-auto my-10">
        {children}
      </main>
      <SmallFooter />
    </div>
  );
}