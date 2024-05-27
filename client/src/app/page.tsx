import HeroSection from "@/components/HeroSection";
import LandingHeader from "@/components/header/LandingHeader";
import LargeFooter from "@/components/LargeFooter";

export default function Home() {
  return (
    <>
      <LandingHeader />
      <main className="container flex-1 mx-auto flex items-center max-lg:py-5 px-5 min-h-screen">
        <HeroSection />
      </main>
      <LargeFooter />
    </>
  );
}
