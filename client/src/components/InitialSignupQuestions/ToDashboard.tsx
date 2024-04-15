import { Button } from "@mui/material";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";

interface ToDashboardProps {
  handleNextStep: () => void;
}

const ToDashboard = ({ handleNextStep }: ToDashboardProps) => {
  return (
    <div className="grid grid-cols-5 grid-rows-5 gap-4 w-full h-full">
      {/* Dashboard Header */}
      <div className="col-start-2 col-span-3 row-start-3 row-span-1 flex justify-center items-center">
        <header className="form-control w-full items-center">
          <span className="label-text font-bold	text-2xl truncate">
            Great! Now let&apos;s head to your dashboard!
          </span>
        </header>
      </div>

      {/* Next Step Button */}
      <div className="col-start-4 col-span-2 row-start-5 row-span-1 justify-end pt-5 pl-32 ">
        <Link href="/dashboard">
          <Button
            onClick={handleNextStep}
            type="submit"
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            className="col-span-1"
            style={{
              padding: "12px 24px",
              textAlign: "right",
              whiteSpace: "nowrap",
            }}
          >
            Dashboard!{" "}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ToDashboard;
