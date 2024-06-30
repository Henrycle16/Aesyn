"use client";

import { useState, useEffect } from "react";
import "@/styles/packagesScrollbar.css";
import PackageCard from "./PackageCard";
import NewPackageButton from "./NewPackageButton";
import AddPackage from "./modals/AddPackage";
import EditPackage from "./modals/EditPackage";
import DeletePackage from "./modals/DeletePackage";
import { getCreatorByUserId } from "@/utils/api/creatorApi";

import { useAppSelector } from "@/redux/store";
import { useSession } from "next-auth/react";

type Package = {
  _id?: string;
  socialMedia: string;
  type: string;
  description: string;
  price: number;
  quantity: number;
};

const Packages = () => {
  const [packages, setPackages] = useState([] as Package[]);
  const [socialMediaTypes, setSocialMediaTypes] = useState(Array.from(new Set(packages.map(packageValue => packageValue.socialMedia))));
  const [socialMediaTab, setSocialMediaTab] = useState<string>(""); 
  // !Todo: Change to grab userId from url parameter
  // const userId = useAppSelector((state) => state.authReducer.value.userId);
  const session = useSession();
  const testId = session.data?.user.id;

  /* useEffect(() => {
    if (socialMediaTypes.length === 1) {
      setSocialMediaTab(socialMediaTypes[0]);
    }
  }, [socialMediaTypes]); */

  useEffect(() => {
    if (testId === undefined) return;
    console.log("UserID: " + testId);
    const getPackages = async () => {
      try {
        const response = await getCreatorByUserId(testId);
        setPackages(response.data.packages);
        let smTypes: string[] = Array.from(new Set(response.data.packages.map((packageValue: Package) => packageValue.socialMedia)));
        setSocialMediaTypes(Array.from(new Set(response.data.packages.map((packageValue: Package) => packageValue.socialMedia))));
        setSocialMediaTab(smTypes[0]);
        console.log("Packages: ", response.data.packages);
      } catch (error) {
        console.error(error);
      }
    }
    getPackages();
  }, [testId]);

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
      {/* TODO: setPackages prop for modals below */}
      <AddPackage setPackages={setPackages} />
      <EditPackage setPackages={setPackages} />
      <DeletePackage setPackages={setPackages} />
    </section>
  );
};

export default Packages;
