import HeroSection from "@/components/ui/HeroSection";
import LandingHeader from "@/components/ui/header/LandingHeader";
import LargeFooter from "@/components/ui/footer/LargeFooter";

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
