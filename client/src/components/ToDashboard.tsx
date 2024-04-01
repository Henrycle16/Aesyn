import { Button } from "@mui/material";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface ToDashboardProps {
  handleNextStep: () => void;
}

const ToDashboard = ({ handleNextStep }: ToDashboardProps) => {
  return (
    <div className="grid grid-cols-10 grid-rows-10 gap-4 w-full h-full">
      <div>Lets head to the dashboard</div>
      <div className="col-start-8 col-span-1 row-start-9 row-span-1 justify-end pt-5 pl-10">
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
      </div>
    </div>
  );
};

export default ToDashboard;
