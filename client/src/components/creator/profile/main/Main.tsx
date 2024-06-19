import TopComponent from "./TopComponent";
import Interests from "./Interests";
import Bio from "./Bio";
import SocialMedia from "./SocialMedia";

const Main = () => {
  return (
    <section className="border border-gray-300 rounded-badge min-h-[59.25rem] grid grid-cols-[1fr,3.1fr] grid-rows-[12.75rem,1fr]">
      {/* Top Component */}
      <TopComponent />
      {/* Interests */}
      <Interests />
      <div className="flex flex-col p-5">
        {/* Bio */}
        <Bio />
        {/* Social Media */}
        <SocialMedia />
      </div>
    </section>
  );
};

export default Main;
