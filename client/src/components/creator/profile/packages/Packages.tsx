"use client";

import { useState, useEffect, useMemo } from "react";
import "@/styles/packagesScrollbar.css";
import PackageCard from "./PackageCard";
import NewPackageButton from "./NewPackageButton";
import AddPackage from "./modals/AddPackage";
import EditPackage from "./modals/EditPackage";
import DeletePackage from "./modals/DeletePackage";
import { getCreatorByUsername } from "@/utils/api/creatorApi";

type Package = {
  _id?: string;
  socialMedia: string;
  type: string;
  description: string;
  price: number;
  quantity: number;
};

const getSocialMediaTypes = (packages: Package[]) => Array.from(new Set(packages.map(packageValue => packageValue.socialMedia)));

const Packages = ({username}: {username: string}) => {
  const [packages, setPackages] = useState([] as Package[]);
  const [socialMediaTab, setSocialMediaTab] = useState(''); 
  const socialMediaTypes = useMemo(() => getSocialMediaTypes(packages), [packages]);

  
  useEffect(() => {
    const getPackages = async () => {
      try {
        const response = await getCreatorByUsername(username);
        setPackages(response.data.packages);
        console.log("Packages: ", response.data.packages);
      } catch (error) {
        console.error(error);
      }
    }
    getPackages();
  }, [username]);
  
  useEffect(() => {
    setSocialMediaTab(socialMediaTypes[0]);
  }, [socialMediaTypes]);

  return (
    <section className="border border-gray-300 rounded-badge min-h-[19.75rem] p-10 flex flex-col text-[#184465]">
      {/* Packages Header Container */}
      <div className="flex items-center gap-2.5">
        <h1 className="text-2xl font-semibold self-end">Packages</h1>
        <NewPackageButton />
      </div>
      {!packages.length && <p className="text-sm font-medium mt-10">
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
        {packages.filter((packageData) => packageData.socialMedia === socialMediaTab).map((packageData) => (
          <PackageCard
            key={packageData._id}
            {...packageData}
          />
        ))}
      </div>
      {/* Package Modals */}
      <AddPackage setPackages={setPackages} />
      <EditPackage setPackages={setPackages} />
      <DeletePackage setPackages={setPackages} />
    </section>
  );
};

export default Packages;
