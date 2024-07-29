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
import LinkVideo from "./modals/LinkVideo";
import ViewPersonal from "./modals/ViewPersonal";
import ViewCampaign from "./modals/ViewCampaign";

type Content = {
  _id?: string;
  contentType: string;
  mediaType: string;
  socialMedia: string;
  uri: string;
  thumbnailUri: string;
  name: string;
  campaignTitle: string;
  description: string;
  date: string;
};

const Portfolio = () => {
  const [isPersonalPortfolio, setisPersonalPortfolio] = useState(true);

  const portfolioContent = useAppSelector(
    (state) => state.creatorContentReducer.value.content
  );

  const personalContent = Array.isArray(portfolioContent)
    ? portfolioContent.filter(
        (contentValue) => contentValue.contentType === "personal"
      )
    : [];

  const campaignContent = Array.isArray(portfolioContent)
    ? portfolioContent.filter(
        (contentValue) => contentValue.contentType === "campaign"
      )
    : [];
  
  const portfolioCount = isPersonalPortfolio ? personalContent.length : campaignContent.length;

  return (
    <section className="border border-gray-300 rounded-badge min-h-[22rem] px-10 pb-10 pt-8 flex flex-col text-[#184465]">
      <div className="flex mb-2 space-x-2">
        <h1 className="text-2xl font-semibold self-end">Portfolio</h1>
        <NewContentButton isPersonalPortfolio={isPersonalPortfolio} portfolioCount={portfolioCount}/>
      </div>
      <div className="my-5 flex gap-12">
        <button
          className={`text-md mb-2 ${
            isPersonalPortfolio
              ? "underline decoration-2 underline-offset-8 font-semibold"
              : "none"
          }`}
          onClick={() => setisPersonalPortfolio(true)}
        >
          Personal Content
        </button>
        <button
          className={`text-md mb-2 ${
            isPersonalPortfolio
              ? "none"
              : "underline decoration-2 underline-offset-8 font-semibold"
          }`}
          onClick={() => setisPersonalPortfolio(false)}
        >
          Previous Campaigns
        </button>
      </div>
      <div className="mt-6 flex flex-wrap -m-2">
        {isPersonalPortfolio ? (
          personalContent.length > 0 ? (
            personalContent.map((contentData) => (
              <div className="w-1/4 p-2" key={contentData._id}>
                <PersonalPortfolioCard
                  {...contentData}
                  thumbnailUri={contentData.thumbnailUri || ""}
                  mediaType={contentData.mediaType || ""}
                />
              </div>
            ))
          ) : (
            <p className="text-sm font-medium ml-2">
              Display your content for clients to see your impressive work!
            </p>
          )
        ) : campaignContent.length > 0 ? (
          campaignContent.map((contentData) => (
            <div className="w-1/4 p-2" key={contentData._id}>
              <CampaignPortfolioCard
                {...contentData}
                thumbnailUri={contentData.thumbnailUri || ""}
                mediaType={contentData.mediaType || ""}
                description={contentData.description || ""}
              />
            </div>
          ))
        ) : (
          <p className="text-sm font-medium ml-2">
            Display your previous campaigns to your potential clients!
          </p>
        )}
      </div>

      <AddPersonal />
      <AddCampaign />
      <EditPersonal />
      <EditCampaign />
      <ViewPersonal />
      <ViewCampaign />
      <DeletePortfolioContent />
      <LinkVideo />
    </section>
  );
};

export default Portfolio;
