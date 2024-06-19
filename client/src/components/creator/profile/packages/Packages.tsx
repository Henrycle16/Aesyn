"use client";

import { useState, useEffect } from "react";
import "@/styles/packagesScrollbar.css";
import PackageCard from "./PackageCard";
import NewPackageButton from "./NewPackageButton";
import AddPackage from "./modals/AddPackage";
import EditPackage from "./modals/EditPackage";
import DeletePackage from "./modals/DeletePackage";

import { useAppSelector } from "@/redux/store";

const Packages = () => {
  let testPackages = useAppSelector((state) => state.creatorPackagesReducer.value.packages);
  const socialMediaTypes =  Array.from(new Set(testPackages.map((packageValue: any) => packageValue.socialMedia)));
  const [socialMediaTab, setSocialMediaTab] = useState(socialMediaTypes[0]);

  useEffect(() => {
    if (socialMediaTypes.length === 1) {
      setSocialMediaTab(socialMediaTypes[0]);
    }
  }, [testPackages, socialMediaTypes]);

  return (
    <section className="border border-gray-300 rounded-badge min-h-[19.75rem] p-10 flex flex-col text-[#184465]">
      {/* Packages Header Container */}
      <div className="flex items-center gap-2.5">
        <h1 className="text-2xl font-semibold self-end">Packages</h1>
        <NewPackageButton />
      </div>
      {!testPackages.length && <p className="text-sm font-medium mt-10">
        Create our content packages to display for brands to purchase.
      </p>}
      <div className="my-5 flex gap-6">
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
      {/* Package Cards Container */}
      <div className="h-[10.688rem] gap-5 flex whitespace-nowrap overflow-x-auto">
        {/* IG Package */}
        {testPackages.filter((packageData) => packageData.socialMedia === socialMediaTab).map((packageData) => (
          <PackageCard
            key={packageData.packageId}
            {...packageData}
          />
        ))}
      </div>
      {/* Package Modals */}
      <AddPackage />
      <EditPackage />
      <DeletePackage />
    </section>
  );
};

export default Packages;
