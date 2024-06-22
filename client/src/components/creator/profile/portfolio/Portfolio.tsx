"use client";

import { useState, useEffect } from "react";
import NewContentButton from "./NewContentButton";
import PersonalPortfolioCard from "./PersonalPortfolioCard";
import CampaignPortfolioCard from "./CampaignPortfolioCard";
import AddPersonal from "./modals/AddPersonal";
import AddCampaign from "./modals/AddCampaign";
import EditPersonal from "./modals/EditPersonal";
import EditCampaign from "./modals/EditCampaign";

import DeletePortfolioContent from "./modals/DeletePortfolioContent";

import { useAppSelector } from "@/redux/store";

const Portfolio = () => {
  const [isPersonalPortfolio, setisPersonalPortfolio] = useState(true);

  let testContent = useAppSelector((state) => state.creatorContentReducer.value.content);
  const contentType =  Array.from(new Set(testContent.map((contentValue: any) => contentValue.type)));

  return (
    <section className="border border-gray-300 rounded-badge min-h-[22rem] px-10 pb-10 pt-8 flex flex-col text-[#184465]">
      <div className="flex mb-2 space-x-2">
        <h1 className="text-2xl font-semibold self-end">Portfolio</h1>
        <NewContentButton isPersonalPortfolio={isPersonalPortfolio} />
      </div>
      <div className="my-5 flex gap-12">
        <button
          className={`text-md mb-2 ${
            isPersonalPortfolio ? "underline decoration-2 underline-offset-8 font-semibold" : "none"
          }`}
          onClick={() => setisPersonalPortfolio(true)}
        >
          Personal Content
        </button>
        <button
          className={`text-md mb-2 ${
            isPersonalPortfolio ? "none" : "underline decoration-2 underline-offset-8 font-semibold"
          }`}
          onClick={() => setisPersonalPortfolio(false)}
        >
          Previous Campaigns
        </button>
      </div>
      <div className="mt-6 flex flex-wrap -m-2">
        {isPersonalPortfolio ? (
          testContent.some((contentData) => contentData.type === "personal") ? (
            testContent.filter((contentData) => contentData.type === "personal").map((contentData) => (
              <div className="w-1/4 p-2" key={contentData.contentId}>
                <PersonalPortfolioCard {...contentData} />
              </div>
            ))
          ) : (
            <p className="text-sm font-medium ml-2">
              Display your content for clients to see your impressive work!
            </p>
          )
        ) : testContent.some((contentData) => contentData.type === "campaign") ? (
          testContent.filter((contentData) => contentData.type === "campaign").map((contentData) => (
            <div className="w-1/4 p-2" key={contentData.contentId}>
              <CampaignPortfolioCard {...contentData} />
            </div>
          ))
        ) : (
          <p className="text-sm font-medium ml-2">
            Display your previous campaigns to your potential clients!
          </p>
        )}
      </div>
      {/* Add Portfolio Modal */}
      <AddPersonal />
      <AddCampaign />
      <EditPersonal />
      <EditCampaign />
      <DeletePortfolioContent />
    </section>
  );
};

export default Portfolio;
