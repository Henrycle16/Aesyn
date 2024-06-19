import Main from "./main/Main";
import Packages from "./packages/Packages";
import Portfolio from "./portfolio/Portfolio";
import UnsavedModal from "./UnsavedModal";

const ProfileLanding = () => {
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
};

export default ProfileLanding;
