import Link from "next/link";
import ThreeMenu from "./creator/ThreeMenu";

const ProfileHeader = () => {
  return (
    <header className="container mx-auto flex flex-wrap px-5 pt-4 flex-col md:flex-row items-center">
      <Link href={"/"} className="text-2xl text-gray-900 font-semibold">
        ShareFluence
      </Link>
      <div className="flex ml-40">
      <ThreeMenu />
      </div>
    </header>
  );
};

export default ProfileHeader;