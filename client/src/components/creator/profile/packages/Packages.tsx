"use client";

import { useState, useEffect, useMemo } from "react";
import { useAppSelector } from "@/redux/store";
import "@/styles/packagesScrollbar.css";

import PackageCard from "./PackageCard";
import NewPackageButton from "./NewPackageButton";
import AddPackage from "./modals/AddPackage";
import EditPackage from "./modals/EditPackage";
import DeletePackage from "./modals/DeletePackage";
import CarouselWrapper from "./CarouselWrapper";


import { useAppSelector } from "@/redux/store";

type Package = {
  _id?: string;
  socialMedia: string;
  type: string;
  description: string;
  price: number;
  quantity: number;
};

const getSocialMediaTypes = (packages: Package[]) => Array.from(new Set(packages.map(packageValue => packageValue.socialMedia)));

const Packages = () => {
  const packagesList = useAppSelector((state) => state.creatorPackagesReducer.value.packages);
  const [socialMediaTab, setSocialMediaTab] = useState(''); 
  const socialMediaTypes = useMemo(() => getSocialMediaTypes(packagesList), [packagesList]);
  
  // TODO: Fix bug where socialMediaTab sets to first tab when a new socialMediaType is created
  useEffect(() => {
    setSocialMediaTab(socialMediaTypes[0]);
  }, [socialMediaTypes]);

  return (
    <section className="border border-gray-300 rounded-badge min-h-[19.75rem] px-10 pt-10 pb-4 flex flex-col text-[#184465]">
      {/* Packages Header Container */}
      <div className="flex items-center gap-2.5">
        <h1 className="text-2xl font-semibold self-end">Packages</h1>
        <NewPackageButton />
      </div>
      {!packagesList.length && <p className="text-sm font-medium mt-10">
        Create our content packages to display for brands to purchase.
      </p>}
      <div className="my-5 flex gap-6 ml-2">
        {
          socialMediaTypes.map((socialMediaType, index) => (
            <button
              key={index}  
              className={`mb-2 font-medium ${socialMediaTab === socialMediaType ? "underline decoration-2 underline-offset-8" : "text-[#4A4A4A]"}`}
              onClick={() => setSocialMediaTab(socialMediaType)}
            >
              {socialMediaType}
            </button>
          ))
        }
      </div>
      {/* Package Cards Container ----- gap-5 flex whitespace-nowrap overflow-x-auto */}
      <div className="relative pb-8 ml-2">
        {/* IG Package */}
        <CarouselWrapper>
          {packagesList.filter((packageData) => packageData.socialMedia === socialMediaTab).map((packageData) => (
            <PackageCard
              key={packageData._id}
              {...packageData}
            />
          ))}
        </CarouselWrapper>
      </div>
      {/* Package Modals */}
      <AddPackage />
      <EditPackage />
      <DeletePackage />
    </section>
  );
};

export default Packages;
