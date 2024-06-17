"use client";

import "@/styles/packagesScrollbar.css";
import PackageCard from "./PackageCard";
import NewPackageButton from "./NewPackageButton";
import AddPackage from "./modals/AddPackage";
import DeletePackage from "./modals/DeletePackage";

import { creatorPackagesInfo } from "@/redux/slices/creatorPackages-slice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";

const Packages = () => {
  const dispatch = useDispatch<AppDispatch>();
  // dispatch(creatorPackagesInfo({ packages: packagesData }));
  let testPackages = useAppSelector((state) => state.creatorPackagesReducer.value.packages);

  return (
    <section className="border border-gray-300 rounded-badge min-h-[22rem] px-10 pb-10 pt-8 flex flex-col text-[#184465]">
      {/* Packages Header Container */}
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold self-end mb-2">Packages</h1>
        <NewPackageButton />
      </div>
      {!testPackages.length && <p className="text-sm font-medium mt-10">
        Create our content packages to display for brands to purchase.
      </p>}
      {/* Package Cards Container */}
      <div className="flex-1 mt-6 ml-8 gap-5 flex whitespace-nowrap overflow-x-auto">
        {/* IG Package */}
        {testPackages.map((packageData) => (
          <PackageCard
            key={packageData.packageId}
            {...packageData}
          />
        ))}
      </div>
      {/* Add Package Modal */}
      <AddPackage />
      <DeletePackage />
    </section>
  );
};

export default Packages;
