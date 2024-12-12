"use client";

import "@/styles/landingCarousel.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import stepOne from "../../../public/carousel-1.png";
import stepTwo from "../../../public/carousel-2.png";
import stepThree from "../../../public/carousel-3.png";
import stepFour from "../../../public/carousel-4.png";
import stepFive from "../../../public/carousel-5.png";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Carousel = () => {
  useGSAP(() => {
    let wheel: HTMLElement = document.querySelector(".wheel")!,
      cards = gsap.utils.toArray<HTMLElement>(".wheel__card"),
      slice = 360 / cards.length;

    function setup() {
      let radius = wheel.offsetWidth / 2,
        center = radius,
        DEG2RAD = Math.PI / 180;
      gsap.set(cards, {
        x: (i) => center + radius * Math.sin(i * slice * DEG2RAD),
        y: (i) => center - radius * Math.cos(i * slice * DEG2RAD),
        rotation: (i) => i * slice,
        xPercent: -50,
        yPercent: -50,
      });
    }

    setup();

    window.addEventListener("resize", setup);

    gsap.to(".wheel", {
      rotate: () => -96, // Rotates to 9 cards -- 360/15 = 24, 24*8 = 192 // 5 cards = 24*4 = 96
      ease: "none",
      scrollTrigger: {
        start: "top top", 
        end: "+=1200",
        scrub: 0.3,
        pin: true,
        snap: {
          snapTo: 1 / 4, 
          duration: { min: 0.2, max: 0.7 }, 
          ease: "power1.inOut", 
          inertia: false,
        },
        invalidateOnRefresh: true,
        trigger: "#carousel",
        endTrigger: "#landing-footer",
      },
    });
  }, []);

  return (
    <>
      <div className="w-full h-[41.219rem] relative overflow-hidden">
        <section className="slider-section pt-[13rem] ">
          <div className="wheel">
            {/* Step 1 */}
            <div className="wheel__card">
              <h3 className="font-bold text-xl">Register Your Brand To Collaborate</h3>
              <div className="relative">
                <div className="h-[10.563rem] w-full mt-auto relative top-[2rem]">
                  <Image
                    src={stepOne}
                    alt="Step 1"
                  />
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="wheel__card">
              <h3 className="font-bold text-xl">Launch Campaign Opportunities</h3>
              <div className="relative">
                <div className="h-[10.563rem] w-full mt-auto relative top-[5rem]">
                  <Image
                    src={stepTwo}
                    alt="Step 2"
                  />
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="wheel__card">
              <h3 className="font-bold text-xl">Review Tailored Proposals</h3>
              <div className="relative">
                <div className="h-[10.563rem] w-full mt-auto relative top-[2rem]">
                  <Image
                    src={stepThree}
                    alt="Step 3"
                  />
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="wheel__card">
              <h3 className="font-bold text-xl">Connect With Top Creators</h3>
              <div className="relative">
                <div className="h-[10.563rem] w-full mt-auto relative top-[2rem]">
                  <Image
                    src={stepFour}
                    alt="Step 4"
                  />
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="wheel__card">
              <h3 className="font-bold text-xl">Publish & Drive Impact</h3>
              <div className="relative">
                <div className="h-[10.563rem] w-full mt-auto relative top-[2.8rem]">
                  <Image
                    src={stepFive}
                    alt="Step 5"
                  />
                </div>
              </div>
            </div>

            <EmptyCards />
            
          </div>
        </section>
      </div>
    </>
  );
};

function EmptyCards() {
  const cards = []

  for (let i = 0; i < 10; i++) {
    cards.push(<div key={i} className="wheel__card invisible"></div>);
  }

  return cards;
}

export default Carousel;
