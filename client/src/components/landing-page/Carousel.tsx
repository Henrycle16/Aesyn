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
              <h3 className="card__header">Register Your Brand</h3>
              <p className="card__subheader">
                Quick and easy sign up
                process to jump start your journey.
              </p>
              <div className="relative self-center">
                <div className="h-[17.063rem] w-[17.063rem] relative bottom-[1.5rem]">
                  <Image
                    src={stepOne}
                    alt="Step 1"
                    className="rotate-[-.83deg]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="wheel__card">
              <h3 className="card__header">Launch Campaigns</h3>
              <p className="card__subheader">
                Create opportunities to
                expand your reach.
              </p>
              <div className="relative self-center">
                <div className="h-[15.375rem] w-[15.375rem] relative top-[0.6rem]">
                  <Image
                    src={stepTwo}
                    alt="Step 2"
                    className="rotate-[9.54deg]"
                  />
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="wheel__card">
              <h3 className="card__header">Tailored Proposals</h3>
              <p className="card__subheader">
                Find the perfect creator that
                can bring your vision to life
                with the power of AI.
              </p>
              <div className="relative self-center">
                <div className="h-[14.438rem] w-[14.438rem] relative">
                  <Image
                    src={stepThree}
                    alt="Step 3"
                  />
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="wheel__card">
              <h3 className="card__header">Connect with Creators</h3>
              <p className="card__subheader">
                Build relationships with top
                creators.
              </p>
              <div className="relative self-center">
                <div className="h-[14.938rem] w-[14.938rem] relative top-[1.25rem]">
                  <Image
                    src={stepFour}
                    alt="Step 4"
                    className="rotate-[5.12deg]"
                  />
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="wheel__card">
              <h3 className="card__header">Drive Impact!</h3>
              <p className="card__subheader">
                Generate meaningful
                engagement with published
                content.
              </p>
              
              <div className="relative self-center">
                <div className="relative bottom-[1rem]">
                  <Image
                    src={stepFive}
                    alt="Step 5"
                    width={153}
                    className="rotate-[7.22deg]"
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
