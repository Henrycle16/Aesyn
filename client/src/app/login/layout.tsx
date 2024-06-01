import Header from "@/components/ui/header/Header";
import SmallFooter from "@/components/ui/footer/SmallFooter";

export default function SignupLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="container flex-1 mx-auto flex items-center max-lg:py-5">
        <section className="container">{children}</section>
      </main>
      <SmallFooter />
    </>
  );
}