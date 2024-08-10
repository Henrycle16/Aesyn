import Header from "@/components/header/Header";
import SmallFooter from "@/components/footer/SmallFooter";

export default function SignupLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="container flex-1 mx-auto flex items-center my-10">
        <section className="container">{children}</section>
      </main>
      <SmallFooter />
    </>
  );
}
