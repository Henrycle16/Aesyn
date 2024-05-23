import Link from "next/link";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const ToDashboard = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Dashboard Header */}
      <div className="flex flex-1 justify-center items-center">
        <h1 className="font-bold text-2xl mb-5">
            Great! Now let&apos;s head to your dashboard!
        </h1>
      </div>

      {/* Next Step Button */}
      <div className="self-end mt-auto">
        <Link href="/dashboard">
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            className="bg-muiblue py-3 px-6"
          >
            Dashboard!
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ToDashboard;
