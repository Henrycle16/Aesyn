import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MapboxMap from "./MapBox";

import {
  userInfo,
  setLocation,
  setLng,
  setLat,
  setZoom,
  setMarkerLocation,
  setIsLocationSelected,
} from "@/redux/slices/signUp-slice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";

const LocationBox = ({}) => {
  const dispatch = useDispatch<AppDispatch>();

  const currentStep = useAppSelector(
    (state) => state.signUpReducer.value.currentStep
  );
  const location = useAppSelector(
    (state) => state.signUpReducer.value.location
  );
  const lng = useAppSelector((state) => state.signUpReducer.value.lng);
  const lat = useAppSelector((state) => state.signUpReducer.value.lat);
  const zoom = useAppSelector((state) => state.signUpReducer.value.zoom);
  const markerLocation = useAppSelector(
    (state) => state.signUpReducer.value.markerLocation
  );
  const isLocationSelected = useAppSelector(
    (state) => state.signUpReducer.value.isLocationSelected
  );

  const onNext = () => {
    dispatch(userInfo({ currentStep: currentStep + 1 }));
  };

  const isDisabled = !isLocationSelected;

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

          {/* Map */}
          <div className="h-80">
            <MapboxMap
              isFormData={location}
              handleLocationChange={(location: string) =>
                dispatch(setLocation(location))
              }
              lng={lng}
              lat={lat}
              zoom={zoom}
              setLng={(lng: number) => dispatch(setLng(lng))}
              setLat={(lat: number) => dispatch(setLat(lat))}
              setZoom={(zoom: number) => dispatch(setZoom(zoom))}
              markerLocation={markerLocation}
              setMarkerLocation={(location: [number, number] | null) =>
                dispatch(setMarkerLocation(location))
              }
              isLocationSelected={isLocationSelected}
              setIsLocationSelected={(isSelected: boolean) =>
                dispatch(setIsLocationSelected(isSelected))
              }
            />
          </div>
        </label>
      </div>

      {/* Next Button */}
      <div className="self-end mt-auto">
        <button
          onClick={onNext}
          disabled={isDisabled}
          className="ts1-bg py-3 px-6 flex items-center justify-center primary-btn"
          style={{ pointerEvents: isDisabled ? "none" : "auto" }}>
          Next
          <ArrowForwardIcon style={{ marginLeft: "8px" }} />
        </button>
      </div>
    </div>
  );
};

export default LocationBox;
