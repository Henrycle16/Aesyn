"use client";

import HeroSection from "@/components/landing-page/HeroSection";
import LandingHeader from "@/components/header/LandingHeader";
import LandingFooter from "@/components/footer/LandingFooter";
import CallToAction from "@/components/landing-page/CallToAction";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { use, useState } from "react";

export default function Home() {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    
    if(latest > (previous ?? 0)){
      setHidden(true);
    }else{
      setHidden(false);
    }

  });

  return (
    <>
      <section className="bg-gradient-to-b from-[#36035F] from-38% via-[#240B4D] via-50% to-[#000000] to-76% text-white">
        <motion.header
          variants={{ visible: { y: 0 }, hidden: { y: "-130%" } }}
          animate={hidden ? "hidden" : "visible"}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="sticky top-5">
          <LandingHeader />
        </motion.header>
        <main>
          <div className="container mx-auto flex justify-center items-center max-lg:py-5 px-5 min-h-screen">
            <HeroSection />
          </div>
        </main>
      </section>
      <section className="bg-gradient-to-b from-[#36035F] from-28% via-[#240B4D] via-30% to-[#000000] to-50% text-white rounded-t-3xl">
        <div className="container mx-auto flex justify-center items-center px-5 ">
          <CallToAction />
        </div>
        <footer>
          <LandingFooter />
        </footer>
      </section>
    </>
  );
}
