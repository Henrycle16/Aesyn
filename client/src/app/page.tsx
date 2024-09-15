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
  
    if (latest > previous) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // Observer for tracking which section is active and updating visibility
  useEffect(() => {
    const sections = [
      { id: "showcase-1", ref: showcase1Ref },
      { id: "showcase-2", ref: showcase2Ref },
      { id: "showcase-3", ref: showcase3Ref },
      { id: "bentobox", ref: bentoboxRef },
      { id: "carousel", ref: carouselRef },
      { id: "hero", ref: heroRef },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const { id } = entry.target;

            // Update visibility state based on scroll direction and active section
            if (scrollDirection === "down") {
              if (id === "showcase-1") {
                setShowcaseVisibility({
                  showcase1: true,
                  showcase2: false,
                  showcase3: false,
                });
              } else if (id === "showcase-2") {
                setShowcaseVisibility({
                  showcase1: false,
                  showcase2: true,
                  showcase3: false,
                });
              } else if (id === "showcase-3") {
                setShowcaseVisibility({
                  showcase1: false,
                  showcase2: false,
                  showcase3: true,
                });
              }
            } else {
              if (id === "showcase-3") {
                setShowcaseVisibility({
                  showcase1: false,
                  showcase2: true,
                  showcase3: false,
                });
              } else if (id === "showcase-2") {
                setShowcaseVisibility({
                  showcase1: true,
                  showcase2: false,
                  showcase3: false,
                });
              }
            }
          }
        });
      },
      { threshold: 0.8 }
    );

    sections.forEach((section) => {
      if (section.ref.current) observer.observe(section.ref.current);
    });

    return () => {
      sections.forEach((section) => {
        if (section.ref.current) observer.unobserve(section.ref.current);
      });
    };
  }, [scrollDirection]);

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
          className="container mx-auto flex justify-center items-center max-lg:py-5 px-5 min-h-screen relative z-10">
          <HeroSection />
        </section>

        <section className="bg-gradient-to-b from-[#E4D6F2] to-[#ECECF0] text-[#190627] rounded-t-[2rem] relative top-[-5rem]">
          {/* Showcase 1 */}
          <div
            id="showcase-1"
            ref={showcase1Ref}
            className={`container mx-auto flex justify-center items-center max-lg:py-5 px-5 min-h-screen ${
              showcaseVisibility.showcase1
                ? "sticky top-[-5rem] z-[22] visible"
                : "z-[20] invisible"
            }`}>
            <Showcase featuredSection={1} />
          </div>

          {/* Showcase 2 */}
          <div
            id="showcase-2"
            ref={showcase2Ref}
            className={`container mx-auto flex justify-center items-center max-lg:py-5 px-5 min-h-screen ${
              showcaseVisibility.showcase2
                ? "sticky top-[-5rem] z-[23] visible"
                : "z-[21] invisible"
            }`}>
            <Showcase featuredSection={2} />
          </div>

          {/* Showcase 3 */}
          <div
            id="showcase-3"
            ref={showcase3Ref}
            className={`container mx-auto flex justify-center items-center max-lg:py-5 px-5 min-h-screen ${
              showcaseVisibility.showcase3
                ? "sticky top-[-5rem] z-[24] visible"
                : "z-[22] invisible"
            }`}>
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
          <div className="container mx-auto flex justify-center items-center px-5">
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
