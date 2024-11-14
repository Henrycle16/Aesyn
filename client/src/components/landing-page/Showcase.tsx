"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import "@/styles/gradientBorder.css";
interface ShowcaseProps {
  feature: number;
  scrollDirection: string;
}

const Showcase = ({ feature }: ShowcaseProps) => {
  // Scrolling up goes from feature-17 to feature-5
  // Scrolling down goes from feature-8 to feature-21

  // Feature 1: < 11
  // Feature 2: 11-14
  // Feature 3: > 14

  const [imgSrc, setImgSrc] = useState<string>("/showcase_analytics.png");
  const [section, setSection] = useState<string>("feature-1");

  const sectionHighlight =
    "bg-gradient-to-br from-[#FDE9FF] to-[#F3EAFF] from-0% to-100%";
  const sectionStyle = "border-[1px] shadow-lg px-20 py-4 rounded-xl";

  useEffect(() => {
    if (feature < 12) {
      setSection("feature-1");
      setImgSrc("/showcase_analytics.png");
    } else if (feature >= 12 && feature <= 15) {
      setSection("feature-2");
      setImgSrc("/showcase_campaigns.png");
    } else if (feature > 15) {
      setSection("feature-3");
      setImgSrc("/showcase_analytics.png");
    }
  }, [feature]);

  return (
    <>
      <div className="flex flex-col items-center max-w-7xl">
        <h1 className="text-[2.5rem] text-center leading-[3rem] font-semibold">
          Empower Your Creative Journey
        </h1>
        <p className="text-center mt-5 mb-16 text-xl max-w-3xl text-[#4A4A4A]">
          Track performance, manage campaigns, and connect with brands - all
          from one powerful dashboard.
        </p>

        <div className="grid grid-cols-[45%_55%] gap-10 items-center justify-center w-[70rem]">
          {/* Left Side: Description */}
          <div className="feature-container-gradient shadow-lg min-h-[250px] bg-gradient-to-br from-[#ffffffb0] to-[#ffffff86] from-0% to-100% px-10 py-10 flex flex-col gap-y-5 rounded-xl">
            <h3 className="font-semibold text-2xl">Create and Connect</h3>
            <p className="text-[#4A4A4A] text-base">
              A dashboard built for creators. Streamline your workflow and take
              control of your creative growth.
            </p>
            <div className="gap-y-5 flex flex-col font-semibold my-10">
              <div
                className={`${
                  section === "feature-1" ? `feature-gradient` : ""
                }`}
              >
                <div
                  className={`${
                    section === "feature-1" ? `${sectionHighlight}` : ""
                  } ${sectionStyle}`}>
                  <div style={{ fontWeight: 700 }}>View Analytics</div>
                  <div>Insights at Your Fingertips</div>
                </div>
              </div>

              <div
                className={`${
                  section === "feature-2" ? `feature-gradient` : ""
                }`}
              >
                <div
                  className={`${
                    section === "feature-2" ? `${sectionHighlight}` : ""
                  } ${sectionStyle}`}
                >
                  <div style={{ fontWeight: 700 }}>Track Campaigns</div>
                  <div>Celebrate Your Milestones</div>
                </div>
              </div>

              <div
                className={`${
                  section === "feature-3" ? `feature-gradient` : ""
                }`}
              >
                <div
                  className={`${
                    section === "feature-3" ? `${sectionHighlight}` : ""
                  } ${sectionStyle}`}>
                  <div style={{ fontWeight: 700 }}>Find Proposals</div>
                  <div>Build Your Portfolio</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="">
            <Image
              src={imgSrc}
              alt="Showcase"
              width={600}
              height={600}
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Showcase;
