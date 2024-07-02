import Main from "@/components/creator/profile/main/Main";
import Packages from "@/components/creator/profile/packages/Packages";
import Portfolio from "@/components/creator/profile/portfolio/Portfolio";
import UnsavedModal from "@/components/creator/profile/UnsavedModal";

type Params = {
  username: string;
};

export default function CreatorProfile({ params }: { params: Params }) {
  return (
    <div className="my-10 flex flex-col gap-10 w-[77.5rem]">
      {/* Main Section */}
      <Main />
      {/* Packages Section */}
      <Packages username={params.username}/>
      {/* Portfolio Section */}
      <Portfolio />
      {/* Unsaved Modal */}
      <UnsavedModal />
    </div>
  );
}