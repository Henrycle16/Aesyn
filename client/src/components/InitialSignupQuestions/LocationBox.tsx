"use client";

import { useEffect } from "react";
// import { Button } from "@mui/material";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MapboxMap from "./MapBox";

interface LocationBoxProps {
  handleLocationChange: (location: string) => void;
  setNextButtonDisabled: (value: boolean) => void;
  // handleNextStep: () => void;
  // handlePrevStep: () => void;
  formData: any;
}

const LocationBox = ({
  formData,
  handleLocationChange,
  setNextButtonDisabled
  // handleNextStep,
  // handlePrevStep,
}: LocationBoxProps) => {
  useEffect(() => {
    if (!formData.location) {
      setNextButtonDisabled(true);
    }

  },)

  return (
    <div className="w-4/6 mt-[-1rem] mb-4">

      {/* Location Box */}
      <div className="">
        <label className="form-control">
          <div className="label">
            <span className="label-text font-bold text-lg">
              {" "}
              Where are you located?{" "}
            </span>
          </div>
        </label>
      </div>

      {/* Map */}
      {/* <div className="col-start-3 col-span-5 row-start-2 row-span-5 pt-12"> */}
      <div className="h-96">
        <MapboxMap isFormData= {formData.location} handleLocationChange={(e) => {
          handleLocationChange(e);
          setNextButtonDisabled(false);
        }} 
        />
      </div>
    </div>
  );
};

export default LocationBox;
