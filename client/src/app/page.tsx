"use client";

import HeroSection from "@/components/landing-page/HeroSection";
import LandingHeader from "@/components/header/LandingHeader";
import LandingFooter from "@/components/footer/LandingFooter";
import CallToAction from "@/components/landing-page/CallToAction";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import BentoBox from "@/components/landing-page/BentoBox";
import Showcase from "@/components/landing-page/Showcase";
import FlickeringGrid from "@/components/magicui/flickering-grid";
import { DotPattern } from "@/components/magicui/dot-pattern";
import dynamic from "next/dynamic";

const Carousel = dynamic(() => import("@/components/landing-page/Carousel"), {
  ssr: false,
});

export default function Home() {
  const [hidden, setHidden] = useState(false);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const [feature, setFeature] = useState<number>(1);
  const [direction, setDirection] = useState<string>("down");
  const { scrollY } = useScroll();
  const previousScrollY = useRef(0);

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
    const sections = ["hero", "showcase", "bentobox", "carousel"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
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

  useEffect(() => {
    if (currentSection === "showcase") {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const currentDirection =
          scrollPosition > previousScrollY.current ? "down" : "up";

        setFeature(Math.floor(scrollPosition / 100));
        // // console.log(`feature-${Math.floor(scrollPosition / 100)}`); // debugging scroll positioning

        previousScrollY.current = scrollPosition;
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [currentSection]);

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
        {/* <FlickeringGrid
          className="z-[1] absolute inset-0 size-full"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.4}
          flickerChance={0.1}
        /> */}
        {/* <DotPattern 
          className="opacity-40"
        /> */}

        <section
          id="hero"
          ref={heroRef}
          className="container mx-auto flex justify-center items-center max-lg:py-5 px-5 min-h-screen relative z-10">
          <FlickeringGrid
            className="z-[1] absolute inset-0 size-full [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
            squareSize={4}
            gridGap={6}
            color="#6B7280"
            maxOpacity={0.5}
            flickerChance={0.1}
          />
          {/* <DotPattern className="opacity-50 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]" /> */}
          <HeroSection />
        </section>

        <section
          id="showcase"
          ref={showcaseRef}
          className={`bg-gradient-to-b from-[#E4D6F2] to-[#ECECF0] text-[#190627] rounded-t-[2rem] relative z-20 top-[-5rem] min-h-[175vh]`}>
          <div
            className={`container mx-auto flex justify-center max-lg:py-5 px-5 pt-36 pb-48 ${
              currentSection === "showcase" ? "sticky top-[-5rem]" : ""
            } ${currentSection === "bentobox" ? "sticky top-[-10rem] " : ""}`}>
            <Showcase feature={feature} scrollDirection={direction} />
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
          className="bg-gradient-to-b from-[#E4D6F2] to-[#ECECF0] text-[#190627] rounded-t-[2rem] min-h-[106vh] relative z-40 top-[-8rem]">
          <div className="mx-auto flex flex-col justify-center items-center min-h-screen">
            <Carousel />
            <h1 className="text-[2.5rem] text-center leading-[3rem] font-semibold">
              From Registration to Brand Impact
            </h1>
          </div>
        </section>

        <section
          id="landing-footer"
          className="bg-gradient-to-b from-[#36035F] from-28% via-[#240B4D] via-30% to-[#000000] to-50% text-white rounded-t-[2rem] absolute w-full z-50 top-[96.3%]">
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
