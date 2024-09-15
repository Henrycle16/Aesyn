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
        const currentDirection = scrollPosition > previousScrollY.current ? "down" : "up";

        setFeature(Math.floor(scrollPosition / 100));
        console.log(`feature-${Math.floor(scrollPosition / 100)}`);

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

        <section
          id="hero"
          ref={heroRef}
          className="container mx-auto flex justify-center items-center max-lg:py-5 px-5 min-h-screen relative z-10">
          <HeroSection />
        </section>

        <section
          id="showcase"
          ref={showcaseRef}
          className={`bg-gradient-to-b from-[#E4D6F2] to-[#ECECF0] text-[#190627] rounded-t-[2rem] relative z-20 top-[-5rem] min-h-[175vh]`}>
          <div className={`container mx-auto flex justify-center max-lg:py-5 px-5 pt-36 pb-48 ${currentSection === "showcase" ? "sticky top-[-5rem]" : ""} ${currentSection === "bentobox" ? "sticky top-[-10rem] ": ""}`}>
            <Showcase feature={feature} scrollDirection={direction}/>
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