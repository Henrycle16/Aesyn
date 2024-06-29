import Main from "@/components/creator/profile/main/Main";
import Packages from "@/components/creator/profile/packages/Packages";
import Portfolio from "@/components/creator/profile/portfolio/Portfolio";
import UnsavedModal from "@/components/creator/profile/UnsavedModal";

export default function CreatorProfile() {
  return (
    <div className="my-10 flex flex-col gap-10 w-[77.5rem]">
      {/* Main Section */}
      <Main />
      {/* Packages Section */}
      <Packages />
      {/* Portfolio Section */}
      <Portfolio />
      {/* Unsaved Modal */}
      <UnsavedModal />
    </div>
  );
}
