"use client";

import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import InstagramLogo from "@/components/ui/logos/Instagram";
import EditPackage from "./modals/EditPackage";
import DeletePackage from "./modals/DeletePackage";

type Props = {
  id: number;
  socialMedia: string;
  packageType: string;
  packageDescription: string;
  price: number;
  quantity: number;
}

const PackageCard = (props: Props) => {
  return (
    <>
      <div className="border border-[#D7D7D7] p-4 rounded-2xl min-w-[21rem] flex flex-col">
        {/* Top Section */}
        <div className="flex">
          <InstagramLogo />
          {/* Text Container */}
          <div className="ml-5">
            <p className="font-medium text-lg">{props.socialMedia}</p>
            <p className="font-bold text-lg mt-4">{`${props.quantity} ${props.packageType}`}</p>
            <p className="font-medium mt-1">{props.packageDescription}</p>
          </div>
          <ModeEditOutlineOutlinedIcon
            sx={{ color: "#3798E3", fontSize: 25 }}
            className="border-2 border-[#3798E3] rounded-full p-[.12rem] ml-auto cursor-pointer"
            onClick={() => (document.getElementById(`edit_package_modal_${props.id}`) as HTMLDialogElement).showModal()}
          />
        </div>
        {/* Bottom Section */}
        <p className="self-end mt-auto text-2xl">{"$" + props.price}</p>
      </div>
      <EditPackage {...props} />
      <DeletePackage id={props.id} />
    </>
  );
};

export default PackageCard;
