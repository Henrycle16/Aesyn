"use client";

import HeroSection from "@/components/landing-page/HeroSection";
import LandingHeader from "@/components/header/LandingHeader";
import LandingFooter from "@/components/footer/LandingFooter";
import CallToAction from "@/components/landing-page/CallToAction";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import BentoBox from "@/components/landing-page/BentoBox";
import Showcase from "@/components/landing-page/Showcase";
import Carousel from "@/components/landing-page/Carousel";

export default function Home() {
  const [hidden, setHidden] = useState(false);
  const [currentSection, setCurrentSection] = useState("hero");
  const [showcaseVisibility, setShowcaseVisibility] = useState({
    showcase1: true,
    showcase2: false,
    showcase3: false,
  });
  const { scrollY } = useScroll();

  const heroRef = useRef<HTMLDivElement>(null);
  const showcase1Ref = useRef<HTMLDivElement>(null);
  const showcase2Ref = useRef<HTMLDivElement>(null);
  const showcase3Ref = useRef<HTMLDivElement>(null);
  const bentoboxRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Track the direction of the scroll
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrollDirection(latest > previous ? "down" : "up");
    setHidden(latest > previous);
  });

  // Observer callback
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    let updatedVisibility = { ...showcaseVisibility };

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const { id } = entry.target as HTMLElement;

        if (scrollDirection === "down") {
          if (id === "showcase-1") {
            updatedVisibility = {
              showcase1: true,
              showcase2: false,
              showcase3: false,
            };
          } else if (id === "showcase-2") {
            updatedVisibility = {
              showcase1: false,
              showcase2: true,
              showcase3: false,
            };
          } else if (id === "showcase-3") {
            updatedVisibility = {
              showcase1: false,
              showcase2: false,
              showcase3: true,
            };
          }
        } else if (scrollDirection === "up") {
          if (id === "showcase-3") {
            updatedVisibility = {
              showcase1: false,
              showcase2: true,
              showcase3: false,
            };
          } else if (id === "showcase-2") {
            updatedVisibility = {
              showcase1: true,
              showcase2: false,
              showcase3: false,
            };
          }
        }
      }
    });

    // Ensure state update only if visibility has actually changed
    if (JSON.stringify(updatedVisibility) !== JSON.stringify(showcaseVisibility)) {
      setShowcaseVisibility(updatedVisibility);
    }
  }, [scrollDirection, showcaseVisibility]);

  // Set up the observer
  useEffect(() => {
    const sections = [
      { id: "showcase-1", ref: showcase1Ref },
      { id: "showcase-2", ref: showcase2Ref },
      { id: "showcase-3", ref: showcase3Ref },
      { id: "bentobox", ref: bentoboxRef },
      { id: "carousel", ref: carouselRef },
      { id: "hero", ref: heroRef },
    ];

    const observer = new IntersectionObserver(handleIntersection, { threshold: [0.1, 0.5, 0.9] });

    sections.forEach((section) => {
      if (section.ref.current) observer.observe(section.ref.current);
    });

    return () => {
      sections.forEach((section) => {
        if (section.ref.current) observer.unobserve(section.ref.current);
      });
    };
  }, [handleIntersection]);

  return (
    <div className="bg-gradient-to-b from-[#36035F] via-[#240B4D] via-10% to-[#000000] to-40% text-white relative z-0">
      <motion.header
        variants={{ visible: { y: 0 }, hidden: { y: "-130%" } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="sticky top-5 z-[99999]"
      >
        <LandingHeader
          currentSection={currentSection}
          refs={{
            heroRef,
            showcase1Ref,
            showcase2Ref,
            showcase3Ref,
            bentoboxRef,
            carouselRef,
          }}
        />
      </motion.header>

      <section
        id="hero"
        ref={heroRef}
        className="container mx-auto flex justify-center items-center max-lg:py-5 px-5 min-h-screen relative z-10"
      >
        <HeroSection />
      </section>

      <section className="bg-gradient-to-b from-[#E4D6F2] to-[#ECECF0] text-[#190627] rounded-t-[2rem] relative top-[-5rem]">
        {/* Showcase 1 */}
        <div
          id="showcase-1"
          ref={showcase1Ref}
          className={`container mx-auto flex justify-center items-center max-lg:py-5 px-5 min-h-screen sticky top-0 ${
            showcaseVisibility.showcase1 ? "z-[24]" : "z-[20]"
          } ${showcaseVisibility.showcase1 ? "visible" : "invisible"}`}
          style={{
            position: "sticky",
            top: "-5rem",
            zIndex: showcaseVisibility.showcase1 ? 24 : 20,
          }}
        >
          <Showcase featuredSection={1} />
        </div>

        {/* Showcase 2 */}
        <div
          id="showcase-2"
          ref={showcase2Ref}
          className={`container mx-auto flex justify-center items-center max-lg:py-5 px-5 min-h-screen sticky top-0 ${
            showcaseVisibility.showcase2 ? "z-[25]" : "z-[21]"
          } ${showcaseVisibility.showcase2 ? "visible" : "invisible"}`}
          style={{
            position: "sticky",
            top: "-5rem",
            zIndex: showcaseVisibility.showcase2 ? 25 : 21,
          }}
        >
          <Showcase featuredSection={2} />
        </div>

        {/* Showcase 3 */}
        <div
          id="showcase-3"
          ref={showcase3Ref}
          className={`container mx-auto flex justify-center items-center max-lg:py-5 px-5 min-h-screen sticky top-0 ${
            showcaseVisibility.showcase3 ? "z-[26]" : "z-[22]"
          } ${showcaseVisibility.showcase3 ? "visible" : "invisible"}`}
          style={{
            position: "sticky",
            top: "-5rem",
            zIndex: showcaseVisibility.showcase3 ? 26 : 22,
          }}
        >
          <Showcase featuredSection={3} />
        </div>
      </section>

      <section
        id="bentobox"
        ref={bentoboxRef}
        className="bg-gradient-to-b from-[#36035F] via-[#240B4D] via-10% to-[#000000] to-80% text-white rounded-t-[2rem] relative z-30 top-[-7rem]"
      >
        <div className="container mx-auto flex justify-center items-center max-lg:py-5 px-5 min-h-screen">
          <BentoBox />
        </div>
      </section>

      <section
        id="carousel"
        ref={carouselRef}
        className="bg-gradient-to-b from-[#E4D6F2] to-[#ECECF0] text-[#190627] rounded-t-[2rem] relative z-40 top-[-8rem]"
      >
        <div className="container mx-auto flex justify-center items-center max-lg:py-5 px-5 min-h-screen">
          <Carousel />
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#36035F] from-28% via-[#240B4D] via-30% to-[#000000] to-50% text-white rounded-t-[2rem] relative z-50 top-[-9rem]">
        <div className="container mx-auto flex justify-center items-center px-5">
          <CallToAction />
        </div>
        <footer>
          <LandingFooter />
        </footer>
      </section>
    </div>
  );
}
