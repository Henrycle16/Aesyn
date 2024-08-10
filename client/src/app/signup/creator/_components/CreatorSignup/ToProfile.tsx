import Link from "next/link";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { clearPersistedState } from "@/redux/store";

const ToProfile = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Profile Header */}
      <div className="flex flex-1 justify-center items-center">
        <h1 className="font-bold text-2xl mb-5">
            Great! Now let&apos;s head to your profile!
        </h1>
      </div>

      {/* Next Step Button */}
      <div className="self-end mt-auto">
        <Link href="/creator/profile">
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            className="bg-muiblue py-3 px-6"
            onClick = {() => {
              clearPersistedState();
             }}
          >
            Profile!
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ToProfile;
