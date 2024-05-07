"use client";

import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MapboxMap from "./MapBox";

interface LocationBoxProps {
  formData: any;
  handleLocationChange: (location: string) => void;
  handleNextStep: () => void;
}

const LocationBox = ({
  formData,
  handleLocationChange,
  handleNextStep,
}: LocationBoxProps) => {
  return (
    <div className="flex flex-col w-full">
      <div className="w-4/6 mt-[-1rem] mb-4 mx-auto my-auto">
        {/* Location Box */}
        <label className="form-control">
          <div className="label">
            <span className="label-text font-bold text-lg">
              {" "}
              Where are you located?{" "}
            </span>
          </div>
        </label>

        {/* Map */}
        <div className="h-96">
          <MapboxMap
            isFormData={formData.location}
            handleLocationChange={(e) => {
              handleLocationChange(e);
            }}
          />
        </div>
      </div>

      {/* Next Button */}
      <div className="self-end">
        <Button
          disabled={!formData.location}
          onClick={handleNextStep}
          type="button"
          variant="contained"
          className="bg-muiblue py-3 px-6"
          endIcon={<ArrowForwardIcon />}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default LocationBox;
