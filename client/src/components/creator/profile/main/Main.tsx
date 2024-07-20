import ProfileCard from "./ProfileCard";
import Interests from "./Interests";
import Bio from "./Bio";
import SocialMedia from "./SocialMedia";

import { useAppSelector } from "@/redux/store";


const Main = () => {
  const test = useAppSelector((state) => state.profileDataReducer.value);
  console.log("Creator Profile Test: ", test);

  return (
    <section className="border border-gray-300 rounded-badge min-h-[38.625rem] grid grid-cols-[1.2fr,3.1fr] grid-rows-[12.75rem,1fr]">
      {/* Profile Card*/}
      <ProfileCard />
      {/* Interests */}
      <Interests />
      <div className="flex flex-col py-8 px-10">
        {/* Bio */}
        <Bio />
        {/* Social Media */}
        <SocialMedia />
      </div>
    </section>
  );
};

export default Main;
