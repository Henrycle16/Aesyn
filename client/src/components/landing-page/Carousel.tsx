"use client";

import "@/styles/landingCarousel.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import stepOne from "../../../public/carousel-1.png";

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
            {/* 1-5 */}
            {/* Step 1 */}
            <div className="wheel__card">
              <h3 className="font-bold text-xl">Business Registration</h3>
              <p className="mt-4">
                Brand signs up, registering details like industry, target audience, and social media presence.
              </p>
              <div className="h-[10.563rem] w-full bg-[#D9D9D9] mt-auto relative">
                <Image
                  src={stepOne}
                  // width={}
                  // height={}
                  alt="Step 1"
                  fill={true}
                  style={{ objectFit: "cover"}}
                />
              </div>
            </div>
            {/* Step 2 */}
            <div className="wheel__card">
              <h3 className="font-bold text-xl">Create Campaign Opportunity</h3>
              <p className="mt-4">
                Brand launches a campaign with marketing goals, content needs, and specific criteria.
              </p>
              <div className="h-[10.563rem] w-full bg-[#D9D9D9] mt-auto"></div>
            </div>
            <div className="wheel__card">
              <h3 className="font-bold text-xl">Receive & Review Proposals</h3>
              <p className="mt-4">
                Creators submit proposals with content ideas, strategies, and pricing packages.
              </p>
              <div className="h-[10.563rem] w-full bg-[#D9D9D9] mt-auto"></div>
            </div>
            <div className="wheel__card">
              <h3 className="font-bold text-xl">Secure Payment & Content Creation</h3>
              <p className="mt-4">
                Platform holds payment securely while the creator develops the content.
              </p>
              <div className="h-[10.563rem] w-full bg-[#D9D9D9] mt-auto"></div>
            </div>
            <div className="wheel__card">
              <h3 className="font-bold text-xl">Publish Content & Make an Impact</h3>
              <p className="mt-4">
                Brand approves completed content, which goes live to engage the target audience.
              </p>
              <div className="h-[10.563rem] w-full bg-[#D9D9D9] mt-auto"></div>
            </div>
            {/* 6-10 */}
            <div className="wheel__card invisible">
              <h3 className="font-bold text-xl">Lorem ipsum dolor sit ame 6</h3>
              <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
              <div className="h-[10.563rem] w-full bg-[#D9D9D9] mt-auto"></div>
            </div>
            <div className="wheel__card invisible">
              <h3 className="font-bold text-xl">Lorem ipsum dolor sit ame 7</h3>
              <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
              <div className="h-[10.563rem] w-full bg-[#D9D9D9] mt-auto"></div>
            </div>
            <div className="wheel__card invisible">
              <h3 className="font-bold text-xl">Lorem ipsum dolor sit ame 8</h3>
              <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
              <div className="h-[10.563rem] w-full bg-[#D9D9D9] mt-auto"></div>
            </div>
            <div className="wheel__card invisible">
              <h3 className="font-bold text-xl">Lorem ipsum dolor sit ame 9</h3>
              <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
              <div className="h-[10.563rem] w-full bg-[#D9D9D9] mt-auto"></div>
            </div>
            <div className="wheel__card invisible">
              <h3 className="font-bold text-xl">Lorem ipsum dolor sit ame 10</h3>
              <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
              <div className="h-[10.563rem] w-full bg-[#D9D9D9] mt-auto"></div>
            </div>
            {/* 11-15 */}
            <div className="wheel__card invisible">
              <h3 className="font-bold text-xl">Lorem ipsum dolor sit ame 11</h3>
              <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
              <div className="h-[10.563rem] w-full bg-[#D9D9D9] mt-auto"></div>
            </div>
            <div className="wheel__card invisible">
              <h3 className="font-bold text-xl">Lorem ipsum dolor sit ame 12</h3>
              <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
              <div className="h-[10.563rem] w-full bg-[#D9D9D9] mt-auto"></div>
            </div>
            <div className="wheel__card invisible">
              <h3 className="font-bold text-xl">Lorem ipsum dolor sit ame 13</h3>
              <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
              <div className="h-[10.563rem] w-full bg-[#D9D9D9] mt-auto"></div>
            </div>
            <div className="wheel__card invisible">
              <h3 className="font-bold text-xl">Lorem ipsum dolor sit ame 14</h3>
              <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
              <div className="h-[10.563rem] w-full bg-[#D9D9D9] mt-auto"></div>
            </div>
            <div className="wheel__card invisible">
              <h3 className="font-bold text-xl">Lorem ipsum dolor sit ame 15</h3>
              <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
              <div className="h-[10.563rem] w-full bg-[#D9D9D9] mt-auto"></div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Carousel;
