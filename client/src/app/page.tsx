import HeroSection from "@/components/ui/HeroSection";
import LandingHeader from "@/components/header/LandingHeader";
import LargeFooter from "@/components/footer/LargeFooter";

export default function Home() {
  return (
    <>
      <section className="bg-gradient-to-b from-[#36035F] from-38% via-[#240B4D] via-50% to-[#000000] to-76% text-white">
        <header>
          <LandingHeader />
        </header>
        <main>
          <div className="container mx-auto flex justify-center items-center max-lg:py-5 px-5 min-h-screen">
            <HeroSection />
          </div>
        </main>
      </section>
      <footer>
        <LargeFooter />
      </footer>
    </>
  );
}
