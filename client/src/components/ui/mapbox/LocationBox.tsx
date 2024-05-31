import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MapboxMap from "./MapBox";

interface LocationBoxProps {
  formData: any;
  handleLocationChange: (location: string) => void;
  lng: number;
  lat: number;
  zoom: number;
  setLng: (lng: number) => void;
  setLat: (lat: number) => void;
  setZoom: (zoom: number) => void;
  markerLocation: [number, number] | null;
  setMarkerLocation: (location: [number, number] | null) => void;
  isLocationSelected: boolean;
  setIsLocationSelected: (isSelected: boolean) => void;
  handleNextStep: () => void;
}

const LocationBox = ({
  formData,
  handleLocationChange,
  lng,
  lat,
  zoom,
  setLng,
  setLat,
  setZoom,
  markerLocation,
  setMarkerLocation,
  isLocationSelected,
  setIsLocationSelected,
  handleNextStep,
}: LocationBoxProps) => {
  return (
    <div className="flex flex-col w-full">
      <div className="w-4/6 mx-auto my-auto">
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
        <div className="h-80">
          <MapboxMap
            isFormData={formData.location}
            handleLocationChange={handleLocationChange}
            lng={lng}
            lat={lat}
            zoom={zoom}
            setLng={setLng}
            setLat={setLat}
            setZoom={setZoom}
            markerLocation={markerLocation}
            setMarkerLocation={setMarkerLocation}
            isLocationSelected={isLocationSelected}
            setIsLocationSelected={setIsLocationSelected}
          />
        </div>
      </div>

      {/* Next Button */}
      <div className="self-end mt-auto">
        <Button
          disabled={!isLocationSelected}
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
