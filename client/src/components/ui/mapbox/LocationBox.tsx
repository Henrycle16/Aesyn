import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MapboxMap from "./MapBox";

import { userInfo, setLocation, setLng, setLat, setZoom, setMarkerLocation, setIsLocationSelected } from "@/redux/slices/user-slice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";

const LocationBox = ({
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const currentStep = useAppSelector((state) => state.userInfoReducer.value.currentStep);
  const location = useAppSelector((state) => state.userInfoReducer.value.location);
  const lng = useAppSelector((state) => state.userInfoReducer.value.lng);
  const lat = useAppSelector((state) => state.userInfoReducer.value.lat);
  const zoom = useAppSelector((state) => state.userInfoReducer.value.zoom);
  const markerLocation = useAppSelector((state) => state.userInfoReducer.value.markerLocation);
  const isLocationSelected = useAppSelector((state) => state.userInfoReducer.value.isLocationSelected);

  const onNext = () => {
    dispatch(userInfo({ currentStep: currentStep + 1 }));
  }

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
            isFormData={location}
            handleLocationChange={(location: string) => dispatch(setLocation(location))}
            lng={lng}
            lat={lat}
            zoom={zoom}
            setLng={(lng: number) => dispatch(setLng(lng))}
            setLat={(lat: number) => dispatch(setLat(lat))}
            setZoom={(zoom: number) => dispatch(setZoom(zoom))}
            markerLocation={markerLocation}
            setMarkerLocation={(location: [number, number] | null) => dispatch(setMarkerLocation(location))}
            isLocationSelected={isLocationSelected}
            setIsLocationSelected={(isSelected: boolean) => dispatch(setIsLocationSelected(isSelected))}
          />
        </div>
      </div>

      {/* Next Button */}
      <div className="self-end mt-auto">
        <Button
          disabled={!isLocationSelected}
          onClick={onNext}
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