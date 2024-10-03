/* "use client";

const Carousel = () => {
  return (
    <>
      <div className="w-full h-[70vh] border border-red-500">
        
      </div>
    </>
  );
};

export default Carousel; */

"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "@/styles/landingCarousel.css";

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
      rotate: () => -360,
      ease: "none",
      duration: cards.length,
      scrollTrigger: {
        start: "top top", 
        end: "+=1000",
        scrub: 0.5,
        pin: true,
        snap: {
          snapTo: 1 / cards.length, 
          duration: { min: 0.2, max: 0.7 }, 
          ease: "power1.inOut", 
          inertia: false,
        },
        invalidateOnRefresh: true,
        trigger: "#carousel",
        endTrigger: "landing-footer",
      },
    });
  }, []);

  return (
    <>
      <div className="w-full h-[41.219rem] relative overflow-hidden">
        <section className="slider-section pt-[13rem] ">
          <div className="wheel">
            {/* 1-5 */}
            <div className="wheel__card">
              <h3 className="font-bold text-xl">Lorem ipsum dolor sit ame 1</h3>
              <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
              <div className="h-[10.563rem] w-full bg-[#D9D9D9] mt-auto"></div>
            </div>
            <div className="wheel__card">
              <h3 className="font-bold text-xl">Lorem ipsum dolor sit ame 2</h3>
              <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
              <div className="h-[10.563rem] w-full bg-[#D9D9D9] mt-auto"></div>
            </div>
            <div className="wheel__card">
              <h3 className="font-bold text-xl">Lorem ipsum dolor sit ame 3</h3>
              <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
              <div className="h-[10.563rem] w-full bg-[#D9D9D9] mt-auto"></div>
            </div>
            <div className="wheel__card">
              <h3 className="font-bold text-xl">Lorem ipsum dolor sit ame 4</h3>
              <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
              <div className="h-[10.563rem] w-full bg-[#D9D9D9] mt-auto"></div>
            </div>
            <div className="wheel__card">
              <h3 className="font-bold text-xl">Lorem ipsum dolor sit ame 5</h3>
              <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
              <div className="h-[10.563rem] w-full bg-[#D9D9D9] mt-auto"></div>
            </div>
            {/* 6-10 */}
            <div className="wheel__card">
              <h3 className="font-bold text-xl">Lorem ipsum dolor sit ame 1</h3>
              <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
              <div className="h-[10.563rem] w-full bg-[#D9D9D9] mt-auto"></div>
            </div>
            <div className="wheel__card">
              <h3 className="font-bold text-xl">Lorem ipsum dolor sit ame 2</h3>
              <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
              <div className="h-[10.563rem] w-full bg-[#D9D9D9] mt-auto"></div>
            </div>
            <div className="wheel__card">
              <h3 className="font-bold text-xl">Lorem ipsum dolor sit ame 3</h3>
              <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
              <div className="h-[10.563rem] w-full bg-[#D9D9D9] mt-auto"></div>
            </div>
            <div className="wheel__card">
              <h3 className="font-bold text-xl">Lorem ipsum dolor sit ame 4</h3>
              <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
              <div className="h-[10.563rem] w-full bg-[#D9D9D9] mt-auto"></div>
            </div>
            <div className="wheel__card">
              <h3 className="font-bold text-xl">Lorem ipsum dolor sit ame 5</h3>
              <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
              <div className="h-[10.563rem] w-full bg-[#D9D9D9] mt-auto"></div>
            </div>
            {/* 11-15 */}
            <div className="wheel__card">
              <h3 className="font-bold text-xl">Lorem ipsum dolor sit ame 1</h3>
              <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
              <div className="h-[10.563rem] w-full bg-[#D9D9D9] mt-auto"></div>
            </div>
            <div className="wheel__card">
              <h3 className="font-bold text-xl">Lorem ipsum dolor sit ame 2</h3>
              <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
              <div className="h-[10.563rem] w-full bg-[#D9D9D9] mt-auto"></div>
            </div>
            <div className="wheel__card">
              <h3 className="font-bold text-xl">Lorem ipsum dolor sit ame 3</h3>
              <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
              <div className="h-[10.563rem] w-full bg-[#D9D9D9] mt-auto"></div>
            </div>
            <div className="wheel__card">
              <h3 className="font-bold text-xl">Lorem ipsum dolor sit ame 4</h3>
              <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
              <div className="h-[10.563rem] w-full bg-[#D9D9D9] mt-auto"></div>
            </div>
            <div className="wheel__card">
              <h3 className="font-bold text-xl">Lorem ipsum dolor sit ame 5</h3>
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
