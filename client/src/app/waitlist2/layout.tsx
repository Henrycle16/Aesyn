import Header from "@/components/header/Header";
import SmallFooter from "@/components/footer/SmallFooter";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="container flex-1 flex items-center justify-center mx-auto my-10">
        {children}
      </main>
      <SmallFooter />
    </>
  );
}