import HeroSection from "@/components/HeroSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="container flex-1 mx-auto flex items-center max-lg:py-5 px-5">
        <HeroSection />
      </main>
      <Footer />
    </>
  );
}
