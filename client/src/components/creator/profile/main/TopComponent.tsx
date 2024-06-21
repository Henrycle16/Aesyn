import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";

const TopComponent = () => {
  return (
    <div className="border-b border-gray-300 col-span-2 py-5 px-10">
      <div className="flex items-center h-full">
        {/* Avatar */}
        <div className="ml-8">
          <div>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <ModeEditOutlineOutlinedIcon
                  sx={{ color: "#3798E3", fontSize: 25 }}
                  className="border-2 border-[#3798E3] rounded-full p-[.12rem] ml-auto cursor-pointer bg-white"
                />
              }
            >
              <Avatar sx={{ width: 150, height: 150 }} />
            </Badge>{" "}
          </div>
        </div>

        {/* Name, location and Verification button*/}
        <div className="flex flex-col justify-items-start flex-1 mb-12 pl-10">
          <div className="flex items-center">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-semibold text-[#184465]">
                Jane Doe{" "}
              </h1>
              <span className="text-sm text-[#061119] flex-grow">
                @Henrayleeee
              </span>
            </div>

            <div className="flex flex-col mb-2.5 pl-6">
              <button className="border-dashed border-2 border-[#3798E3] py-2 px-5 rounded-md flex items-center justify-center">
                <span className="text-[#3798E3] font-semibold">
                  {" "}
                  Verify Now
                </span>
                <VerifiedUserOutlinedIcon
                  sx={{ color: "#3798E3", fontSize: 22 }}
                  className="ml-3"
                />
              </button>{" "}
            </div>
          </div>

          <div className="flex items-center mt-2.5 gap-1 ml-[-0.3rem]">
            <LocationOnOutlinedIcon sx={{ color: "#6D6D6D" }} />
            <span className="text-sm text-[#061119] flex-grow">
              Narnia, Houston
            </span>
          </div>
        </div>

        {/* Public View Button */}
        <div className="flex flex-col ml-auto mb-24">
          {" "}
          <button className="border-solid border-2 border-[#3798E3] py-2 px-6 rounded-md flex items-center justify-center">
            <span className="text-[#3798E3] font-semibold">
              {" "}
              See Public View
            </span>
          </button>{" "}
        </div>
      </div>
    </div>
  );
};

export default TopComponent;
