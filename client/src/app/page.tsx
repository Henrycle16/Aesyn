"use client";

import HeroSection from "@/components/landing-page/HeroSection";
import LandingHeader from "@/components/header/LandingHeader";
import LandingFooter from "@/components/footer/LandingFooter";
import CallToAction from "@/components/landing-page/CallToAction";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import BentoBox from "@/components/landing-page/BentoBox";
import Showcase from "@/components/landing-page/Showcase";
import Carousel from "@/components/landing-page/Carousel";

export default function Home() {
  const [hidden, setHidden] = useState(false);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const [showcaseActive, setShowcaseActive] = useState(false);
  const { scrollY } = useScroll();

  const heroRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const bentoboxRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > (previous ?? 0)) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  //this is to track what section the user is on
  useEffect(() => {
    const sections = [
      "hero",
      "showcase-1",
      "showcase-2",
      "showcase-3",
      "bentobox",
      "carousel",
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id);
            console.log(`Current section: ${entry.target.id}`);

            if (entry.target.id === "showcase-1" || entry.target.id === "showcase-2" || entry.target.id === "showcase-3") {
              setShowcaseActive(true);
              console.log("Showcase is active");
            } else {
              setShowcaseActive(false);
              console.log("Showcase is not active");
            }
          }
        });
      },
      { threshold: 0.8 }
    );

    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <>
      <div className="bg-gradient-to-b from-[#36035F] via-[#240B4D] via-10% to-[#000000] to-40% text-white relative z-0">
        <motion.header
          variants={{ visible: { y: 0 }, hidden: { y: "-130%" } }}
          animate={hidden ? "hidden" : "visible"}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="sticky top-5 z-[99999]">
          <LandingHeader
            currentSection={currentSection}
            refs={{ heroRef, showcaseRef, bentoboxRef, carouselRef }}
          />
        </motion.header>

        <section
          id="hero"
          ref={heroRef}
          className="container mx-auto flex justify-center items-center max-lg:py-5 px-5 min-h-screen relative z-10">
          <HeroSection />
        </section>

        <section
          className={`bg-gradient-to-b from-[#E4D6F2] to-[#ECECF0] text-[#190627] rounded-t-[2rem] relative z-20 top-[-5rem]`}>
          <div
            className={`container mx-auto flex justify-center items-center max-lg:py-5 px-5 min-h-screen ${
              showcaseActive ? "sticky top-[-5rem] z-[21]" : ""
            }`}
            id="showcase-1"
            ref={showcaseRef}>
            <Showcase featuredSection={1} />
          </div>
          <div
            className={`container mx-auto flex justify-center items-center max-lg:py-5 px-5 min-h-screen ${
              showcaseActive ? "sticky top-[-5rem] z-[22]" : ""
            }`}
            id="showcase-2"
            ref={showcaseRef}>
            <Showcase featuredSection={2} />
          </div>
          <div
            className={`container mx-auto flex justify-center items-center max-lg:py-5 px-5 min-h-screen ${
              showcaseActive ? "sticky top-[-5rem] z-[23]" : ""
            }`}
            id="showcase-3"
            ref={showcaseRef}>
            <Showcase featuredSection={3} />
          </div>
        </section>

        <section
          id="bentobox"
          ref={bentoboxRef}
          className="bg-gradient-to-b from-[#36035F] via-[#240B4D] via-10% to-[#000000] to-80% text-white rounded-t-[2rem] relative z-30 top-[-7rem]">
          <div className="container mx-auto flex justify-center items-center max-lg:py-5 px-5 min-h-screen">
            <BentoBox />
          </div>
        </section>

        <section
          id="carousel"
          ref={carouselRef}
          className="bg-gradient-to-b from-[#E4D6F2] to-[#ECECF0] text-[#190627] rounded-t-[2rem] relative z-40 top-[-8rem]">
          <div className="container mx-auto flex justify-center items-center max-lg:py-5 px-5 min-h-screen">
            <Carousel />
          </div>
        </section>

        <section className="bg-gradient-to-b from-[#36035F] from-28% via-[#240B4D] via-30% to-[#000000] to-50% text-white rounded-t-[2rem] relative z-50 top-[-9rem]">
          <div className="container mx-auto flex justify-center items-center px-5 ">
            <CallToAction />
          </div>
          <footer>
            <LandingFooter />
          </footer>
        </section>
      </div>
    </>
  );
}
