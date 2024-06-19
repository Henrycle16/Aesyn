"use client";

import { useState } from "react";
import NewContentButton from "./NewContentButton";
import PersonalPortfolioCard from "./PersonalPortfolioCard";
import CampaignPortfolioCard from "./CampaignPortfolioCard";

const personalContentData: any[] = [
  {
    id: 0,
    imageURI: "/joe-cool.jpg",
  },
  {
    id: 1,
    imageURI: "/luka-cool.jpg",
  },
  {
    id: 2,
    imageURI: "/s-cool.jpg",
  },
  {
    id: 3,
    imageURI: "/scott-cool.jpg",
  },
  {
    id: 4,
    imageURI: "/calvin-cool.jpg",
  },
];

const previousCampaignData: any[] = [
  {
    id: 0,
    imageURI: "/biden.jpg",
    description: "Worked with Joe Biden on his presidential campaign. #Biden2020",
    date: "2021-10-10",
  },
  {
    id: 1,
    imageURI: "/trump.jpg",
    description: "Worked with Donald Trump on his presidential campaign. #Trump2020",
    date: "2021-10-10",
  },
  {
    id: 2,
    imageURI: "/obama.jpg",
    description: "Worked with Barack Obama on his presidential campaign. #Obama2020",
    date: "2021-10-10",
  },
  {
    id: 3,
    imageURI: "/bush.jpg",
    description: "Worked with George Bush on his presidential campaign. #Bush2020",
    date: "2021-10-10",
  },
];

const Portfolio = () => {
  const [isPersonalPortfolio, setisPersonalPortfolio] = useState(true);
  return (
    <section className="border border-gray-300 rounded-badge min-h-[13.625rem] px-10 pb-10 pt-8 flex flex-col text-[#184465]">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold self-end mb-2">Portfolio</h1>
        <NewContentButton />
      </div>
      <div className="my-5 flex gap-12">
        <button
          style={{
            textDecoration: isPersonalPortfolio ? "underline" : "none",
            textUnderlineOffset: "0.5rem",
          }}
          className={`text-xl mb-2 ${
            isPersonalPortfolio ? "font-semibold" : ""
          }`}
          onClick={() => setisPersonalPortfolio(true)}
        >
          Personal Content
        </button>
        <button
          style={{
            textDecoration: isPersonalPortfolio ? "none" : "underline",
            textUnderlineOffset: "0.5rem",
          }}
          className={`text-xl mb-2 ${
            isPersonalPortfolio ? "" : "font-semibold"
          }`}
          onClick={() => setisPersonalPortfolio(false)}
        >
          Previous Campaigns
        </button>
      </div>
      <div className="mt-6 ml-8 gap-5 flex flex-wrap">
        {isPersonalPortfolio ? (
          personalContentData.length > 0 ? (
            personalContentData.map((contentData) => (
              <div className="w-1/4" key={contentData.id}>
                <PersonalPortfolioCard {...contentData} />
              </div>
            ))
          ) : (
            <p className="text-sm font-medium ml-[-2rem]">
              Display your content for clients to see your impressive work!
            </p>
          )
        ) : previousCampaignData.length > 0 ? (
          previousCampaignData.map((campaignData) => (
            <div className="w-1/4" key={campaignData.id}>
              <CampaignPortfolioCard {...campaignData} />
            </div>
          ))
        ) : (
          <p className="text-sm font-medium ml-[-2rem]">
            Display your previous campaigns to your potential clients!
          </p>
        )}
      </div>
      {/* Add Portfolio Modal */}
    </section>
  );
};

export default Portfolio;
