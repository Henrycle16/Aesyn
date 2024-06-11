"use client";

import InstagramLogo from "@/components/ui/logos/Instagram";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

type Props = {
  socialMedia: string;
  packageType: string;
  packageDescription: string;
  price: string;
}

const PackageCard = (props: Props) => {
  return (
    <div className="border border-[#D7D7D7] p-4 rounded-2xl min-w-[21rem] flex flex-col">
      {/* Top Section */}
      <div className="flex">
        <InstagramLogo />
        {/* <p className=" font-medium text-lg ml-5">{props.socialMedia}</p> */}
        <div className="ml-5">
          <p className="font-medium text-lg">{props.socialMedia}</p>
          <p className="font-bold text-lg mt-4">{props.packageType}</p>
          <p className="font-medium mt-1">{props.packageDescription}</p>
        </div>
        <ModeEditOutlineOutlinedIcon
          sx={{ color: "#3798E3", fontSize: 25 }}
          className="border-2 border-[#3798E3] rounded-full p-[.12rem] ml-auto cursor-pointer"
          onClick={() => console.log("Edit Package")}
        />
      </div>
      {/* Middle Section */}
      {/* <div className="ml-12 mt-4">
        <p className="font-bold text-lg">{props.packageType}</p>
        <p className="font-medium mt-1">{props.packageDescription}</p>
      </div> */}
      {/* Bottom Section */}
      <p className="self-end mt-auto text-2xl">{props.price}</p>
    </div>
  );
};

export default PackageCard;
