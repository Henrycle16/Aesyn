import React, { useEffect, useState } from "react";
import MapChart from "./MapChart";
import { AgeHistogram } from "../_components/charting/AgeHistogram";
import GenderPieChart from "./charting/GenderPieChart";
import { useAppSelector } from "@/redux/store";

const Demographic = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  const instaStore = useAppSelector(
    (state) => state.instagramDataReducerV2.value
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsHydrated(true);
    }, 10);

    return () => clearTimeout(timeout);
  }, []);

  // Transform followersTopCities object into an array of objects
  // Ensure instaStore.followersTopCities is not undefined or null
  const followersTopCitiesArray = Array.isArray(instaStore.followersTopCities)
    ? instaStore.followersTopCities.map(
        (cityData: { location: any; value: any }) => ({
          city: cityData.location,
          value: cityData.value,
        })
      )
    : [];

  // Transform followersAge object into an array of objects
  const followersAgeArray = Array.isArray(instaStore.followersAge)
    ? instaStore.followersAge
    : Object.keys(instaStore.followersAge || {}).map((ageGroup) => ({
        ageGroup,
        value: instaStore.followersAge[ageGroup],
      }));

  return (
    <div className="border border-gray-300 rounded-badge min-h-[35.125rem] px-10 pt-10 pb-4">
      <div className="heading1">Followers Demographics</div>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 gap-6 mt-8">
        {/* First Column */}
        <div className="flex flex-col gap-6">
          <div className="border border-black rounded-lg p-6 flex flex-col items-start justify-between min-h-[17.625rem]">
            <div className="body2 ts5-text mb-4">AGE</div>
            {instaStore.followersGender && isHydrated ? (
              <AgeHistogram data={followersAgeArray} />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                Loading ...
              </div>
            )}
          </div>
          <div className="border border-black rounded-lg p-6 flex flex-col items-start justify-between min-h-[17.625rem]">
            <div className="body2 ts5-text mb-4">GENDER</div>
            {instaStore.followersGender && isHydrated ? (
              // temp solution for the data, lmk if this works Antho
              <GenderPieChart
                data={{
                  female: instaStore.followersGender.female || 0,
                  male: instaStore.followersGender.male || 0,
                  other: instaStore.followersGender.other || 0,
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                Loading ...
              </div>
            )}
          </div>
        </div>

        {/* Second Column */}
        <div className="border border-black rounded-lg p-6 flex flex-col items-start justify-between min-h-[35.25rem]">
          <div className="body2 ts5-text mb-4">LOCATION</div>
          {followersTopCitiesArray.length > 0 && isHydrated ? (
            <MapChart data={followersTopCitiesArray} />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              Loading ...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Demographic;
